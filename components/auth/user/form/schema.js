import * as Yup from "yup";

const lowerLetterRegex = "(?=.*?[a-z])"; // Password should contain a lower case letter
const upperLetterRegex = "(?=.*?[A-Z])"; // Password should contain an upper case letter
const numberRegex = "(?=.*[0-9])"; // Password should contain number
const specialCharRegex = "(?=.*[!@#$%^&*])(?=.{8,})"; // Password should contain one of these symbols (!@#$%^&*).
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const formSchema = Yup.object().shape({
  userName: Yup.string().required("User name is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password should be at least 8 cahracters")
    .max(60, "Password should not be greater than 60!")
    .matches(lowerLetterRegex, "Password should contain a lowercase letter")
    .matches(upperLetterRegex, "Password should contain an uppercase letter")
    .matches(numberRegex, "Password should contain a number")
    .matches(
      specialCharRegex,
      "Password should contain a special character !@#$%^&*",
    )
    .required("Password is required"),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
});
