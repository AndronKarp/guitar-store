<template>
  <b-modal
    ref="checkout"
    no-close-on-backdrop
    hide-footer
    title="Add payment details"
    :visible="visible"
    @change="onChange"
  >
    <b-form class="d-flex flex-column" novalidate @submit.prevent="pay">
      <b-form-group>
        <label for="card-number-input">Card number</label>
        <b-input-group>
          <b-form-input
            v-model="$v.form.cardNumber.$model"
            type="text"
            id="card-number-input"
            placeholder="Valid card number"
            :formatter="onlyNumbersFormatter"
            :state="validationState('cardNumber')"
          ></b-form-input>
          <template #append>
            <b-input-group-text>
              <b-icon-credit-card></b-icon-credit-card>
            </b-input-group-text>
          </template>
        </b-input-group>
        <b-form-invalid-feedback>Invalid card number</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group>
        <label for="exp-date-input">Expiration date</label>
        <b-form-input
          v-model="$v.form.expDate.$model"
          type="month"
          id="exp-date-input"
          :min="getCurrentMonth()"
          :state="validationState('expDate')"
        ></b-form-input>
        <b-form-invalid-feedback>Invalid month</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group>
        <label for="cvc-input">CV code</label>
        <b-form-input
          v-model="$v.form.cvc.$model"
          type="text"
          id="cvc-input"
          placeholder="CVC"
          :formatter="onlyNumbersFormatter"
          :state="validationState('cvc')"
        ></b-form-input>
        <b-form-invalid-feedback>Invalid CV code</b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        :class="{ 'bg-info': !$v.$invalid }"
        :disabled="$v.$invalid"
        >Pay {{ cartTotal | currency }}</b-button
      >
    </b-form>
  </b-modal>
</template>

<script>
import notifications from "../mixins/notifications";
import { validationMixin } from "vuelidate";
import { mapGetters } from "vuex";
import { required, maxLength, minLength } from "vuelidate/lib/validators";
import { valid } from "../validators/card-num-validator";
import { currentOrNextMonthSelected } from "../validators/month-validator";

export default {
  props: ["visible"],
  model: {
    prop: "visible",
    event: "change"
  },
  data() {
    return {
      form: {
        cardNumber: "",
        expDate: "",
        cvc: ""
      },
      isFormSubmitting: false
    };
  },
  validations: {
    form: {
      cardNumber: {
        required,
        maxLength: maxLength(19),
        minLength: minLength(13),
        valid
      },
      expDate: {
        required,
        currentOrNextMonthSelected
      },
      cvc: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(4)
      }
    }
  },
  computed: {
    ...mapGetters(["cartTotal"]),
    validationState: () =>
      function(field) {
        const { $error, $dirty } = this.$v.form[field];
        return $dirty ? !$error : null;
      }
  },
  methods: {
    onChange(value) {
      this.$emit("change", value);
    },
    onlyNumbersFormatter(value) {
      return value.replace(/^([^0-9]*)$/, "");
    },
    getCurrentMonth() {
      return new Date().toISOString().slice(0, 7);
    },
    pay() {
      this.isFormSubmitting = true;
      this.$store.dispatch("clearCart");
      this.isFormSubmitting = false;
      this.$refs["checkout"].hide();
      this.showNotification({
        message: "Thank you for purchase!",
        type: "success"
      });
      this.resetForm();
    },
    resetForm() {
      this.$v.$reset();
      this.form.cardNumber = "";
      this.form.expDate = "";
      this.form.cvc = "";
    }
  },
  mixins: [notifications, validationMixin]
};
</script>

<style></style>
