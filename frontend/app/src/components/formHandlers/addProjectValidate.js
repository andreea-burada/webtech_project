export default function validateInfo(values) {
    // validate add team form
    let errors = {};
  
    // name - not blank
    if (!values.name.trim()) {
      errors.name = "Project name field cannot be blank";
    }

    if(!values.repo_link.trim()) {
        errors.repo_link = "Repo link field cannot be blank";
    } else {
        try {
            let dummy = new URL(values.repo_link);
        } catch (error) {
            errors.repo_link = "Link is not a valid URL";
        }
    }
    
    return errors;
}