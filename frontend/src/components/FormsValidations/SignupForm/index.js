import * as Yup from 'yup'

export const signUpSchema = Yup.object({
    name:Yup.string().min(5).max(25).required("Please Enter Your First Name"),
    email:Yup.string().email().required("Please Enter Your Email"),
    password:Yup.string().min(2).max(10).required("Please Enter Password")
})