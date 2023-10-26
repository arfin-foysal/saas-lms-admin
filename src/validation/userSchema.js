import * as Yup from "yup";

export const userSchema = Yup.object().shape({

    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    password: Yup.string().required("Password is required"),
    confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Password confirmation is required"),
    user_role: Yup.string().required("Role is required"),
    is_active: Yup.string().required("Status is required"),



});
