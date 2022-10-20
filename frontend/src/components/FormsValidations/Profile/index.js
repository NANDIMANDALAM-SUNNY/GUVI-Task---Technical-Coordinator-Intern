import * as Yup from 'yup'

export const profileSchema = Yup.object({
    age:Yup.number().min(5).max(100).required("Please Enter Your age Name"),
    number: Yup.number().required("Please Enter Your mobile Number"),
    gender : Yup.string().required("Please Enter Your gender"),
})