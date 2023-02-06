import * as Yup from "yup";

export const initialValues = { name: "", email: "", password: "", isAdmin: false };

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  email: Yup.string().email("Debe ser un email válido").required("El email es requerido"),
  password: Yup.string()
    .min(6, "Debe tener más de 6 caracteres")
    .required("La contraseña es requerida"),
  isAdmin: Yup.boolean(),
});

export const nameValidation = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
});

export const emailValidation = Yup.object().shape({
  email: Yup.string().email("Debe ser un email válido").required("El email es requerido"),
});

export const passwordValidation = Yup.object().shape({
  password: Yup.string()
    .min(6, "Debe tener más de 6 caracteres")
    .required("La contraseña es requerida"),
});
