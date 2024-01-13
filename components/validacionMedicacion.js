import * as yup from 'yup';

export const validacion = yup.object().shape({
    hora: yup
    .number("Tiene que ser un número")
    .required("Se necesita este campo")
    .min(1, "Es demasiado corto")
    .max(24, "Es demasiado largo"),
    medicacion: yup
    .string("Debe de ser una cadena de caracteres")
    .required("Se necesita este campo")
    .min(3, "Demasiado corto")
    .max(50, "Demasiado largo"),
})