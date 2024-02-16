import * as yup from 'yup'

const validationSchema = yup.object({
    name: yup
    .string('Ingrese un nombre')
    .required('El nombre es requerido'),
    price: yup
    .number('Ingrese el precio')
    .required('El precio es requerido')
})

export default validationSchema