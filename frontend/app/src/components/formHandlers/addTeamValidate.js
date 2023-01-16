export default function validateInfo(values) {
  // validate add team form
  let errors = {};

  // name - not blank
  if (!values.name.trim()) {
    errors.name = "Name field cannot be blank";
  }

  // initials - not blank
  if (!values.initials) {
    errors.initials = "Initials field cannot be blank";
  }
  
  return errors;
}
