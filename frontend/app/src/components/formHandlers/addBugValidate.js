export default function validateInfo(values) {
    // validate add team form
    let errors = {};
  
    // name - not blank
    if (!values.name.trim()) {
      errors.name = "Bug title field cannot be blank";
    }

    if(!values.severity) {
        errors.severity = "Severity field cannot be blank";
    }

    if(!values.link.trim()) {
        errors.link = "Link field cannot be blank";
    } else {
        try {
            let dummy = new URL(values.link);
        } catch (error) {
            errors.link = "Link is not a valid URL";
        }
    }
    
    return errors;
}