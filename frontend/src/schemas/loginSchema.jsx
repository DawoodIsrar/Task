import * as Yup from "yup"

export const loginInSchema=Yup.object({
  email:Yup.string().email().required("Please Enter Email"),
  password: Yup.string().min(8).required("Please enter your password"),
});