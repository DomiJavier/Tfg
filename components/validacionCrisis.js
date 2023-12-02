import * as yup from 'yup';

export const validacion = yup.object().shape({
    duracion: yup
    .number("Tiene que ser un numero")
    .required("Se necesita este campo")
    .min(1, "Es demasiado corto")
    .max(60, "Es demasiado largo")
})