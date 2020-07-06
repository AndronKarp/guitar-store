function setValidations(form) {
  const formFields = Object.entries(form);
  formFields.forEach(([fieldName, field]) => {
    const value = {};
    const validations = Object.entries(field.meta.validations);
    validations.forEach(([validationName, validation]) => {
      value[validationName] = validation.rule;
    });
    this[fieldName] = { value };
  });
}

export { setValidations };
