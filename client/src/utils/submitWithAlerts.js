import * as Swal from "sweetalert2";

const errorMessages = {
  "auth/email-already-in-use": "El correo ya esta en uso",
  "auth/invalid-email": "El correo no es valido",
  "auth/weak-password": "La contraseña debe tener al menos 6 caracteres",
  default: "Error al crear el usuario",
};

const confirm = (config = {}) =>
  Swal.fire({
    title: "¿Seguro que desea realizar esta acción?",
    icon: "warning",
    showCancelButton: true,
    // confirmButtonColor: "#1565c0",
    confirmButtonText: "Si",
    cancelButtonText: "Cancelar",
    ...config,
  });

const loading = () =>
  Swal.fire({
    // didOpen: () => Swal.showLoading(),
    // didClose: () => Swal.hideLoading(),
    title: "Espere un momento",
    text: "Estamos procesando su información",
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    showConfirmButton: false,
    icon: "info",
  });

const onSuccess = (config = {}) =>
  Swal.fire({
    title: "Acción realizada con éxito",
    icon: "success",
    ...config,
  });
// setTimeout(() => {
//   Swal.fire({
//     title: "Acción realizada con éxito",
//     icon: "success",
//     ...config,
//   });
// }, 10);

const onError = async (error, config = {}) =>
  Swal.fire({
    title: "Ha ocurrido un error",
    text: errorMessages[error.code] || errorMessages.default,
    icon: "error",
    // confirmButtonColor: "#1565c0",
    ...config,
  });
// setTimeout(() => {
//   Swal.fire({
//     title: "Ha ocurrido un error",
//     text: errorMessages[error.code] || errorMessages.default,
//     icon: "error",
//     // confirmButtonColor: "#1565c0",
//     ...config,
//   });
// }, 10);

export const submitWithAlerts = async (submit, config = {}) => {
  const { confirm: confirmConfig, success: onSuccessConfig, error: onErrorConfig } = config;
  const { isConfirmed: shouldSubmit } = await confirm(confirmConfig);

  if (!shouldSubmit) return null;

  loading();
  Swal.showLoading();

  let response = null;
  try {
    response = await submit();
    // throw new Error("Error");
    // Swal.hideLoading();
    onSuccess(onSuccessConfig);
  } catch (error) {
    // Swal.hideLoading();
    onError(error, onErrorConfig);
  } finally {
    return response;
  }
};

export default submitWithAlerts;
