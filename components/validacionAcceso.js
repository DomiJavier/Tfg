import * as yup from 'yup';

export const validacion = yup.object().shape({
    usuario: yup
    .string("Debe de ser una cadena de caracteres")
    .required("Se necesita este campo")
    .min(5, "El usuario es demasiado corto")
    .max(50, "El usuario es demasiado largo"),
    pass: yup
    .string("Debe de ser una cadena de caracteres")
    .required("Se necesita este campo")
    .min(5, "La contraseña es demasiado corta")
    .max(50, "La contraseña es demasiado larga"),
})