export default {
  methods: {
    setValidations() {
      const form = {};
      const formFields = Object.entries(this.form);
      formFields.forEach(([fieldName, field]) => {
        const value = {};
        const validations = Object.entries(field.meta.validations);
        validations.forEach(([validationName, validation]) => {
          value[validationName] = validation.rule;
        });
        form[fieldName] = { value };
      });
      return form;
    }
  }
};
