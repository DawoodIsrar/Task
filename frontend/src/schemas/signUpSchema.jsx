import * as Yup from "yup"

export const signUpSchema=Yup.object({
  username:Yup.string().min(3).required("Please Enter User Name"),
    email:Yup.string().email().required("Please Enter Email"),
    position:Yup.string().min(3).required("Please Enter Position"),
    password: Yup.string().min(8).required("Please enter your password"),
    retypePassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
});
