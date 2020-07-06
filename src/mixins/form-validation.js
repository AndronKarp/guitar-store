import { setValidations } from "../helpers";

export default {
  methods: {
    getValidations() {
      const validations = {};
      setValidations.call(validations, this.form);
      return validations;
    }
  }
};
