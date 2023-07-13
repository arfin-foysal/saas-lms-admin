import * as Yup from "yup";

export const signupSchema = Yup.object().shape({

    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required")
        .min(4, "Username must be at least 4 characters long")
    ,
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    password: Yup.string().required("Password is required"),
    confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Password confirmation is required"),
    
    
    
     
  




});
