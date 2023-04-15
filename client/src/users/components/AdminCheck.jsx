import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import * as Swal from "sweetalert2";
import { update, USERS } from "../../firebase/firestore";

const loader = () =>
  Swal.fire({
    didOpen: () => Swal.showLoading(),
    didClose: () => Swal.hideLoading(),
    title: "Espere un momento",
    text: "Estamos procesando su solicitud",
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    showConfirmButton: false,
    icon: "info",
  });

const updateAlert = () =>
  Swal.fire({
    title: "¿Seguro que desea cambiar el estado de este usuario?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#1565c0",
    confirmButtonText: "Si, cambiar",
    cancelButtonText: "Cancelar",
  });

export const AdminCheck = ({ user }) => {
  const [checked, setChecked] = useState(user.isAdmin);

  return (
    <Checkbox
      name="isAdmin"
      checked={checked}
      onChange={async (e) => {
        updateAlert()
          .then(async (response) => {
            if (!response.isConfirmed) return;
            loader();
            await update(USERS, user.id, { isAdmin: !checked });
            setChecked((prev) => !prev);
            return response;
          })
          .then((response) => {
            if (!response) return;
            Swal.fire({
              title: `Ahora ${user.isAdmin ? "no es" : "es"} administrador`,
              icon: "success",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Ha ocurrido un error",
              text: error.message,
              icon: "error",
              confirmButtonColor: "#1565c0",
            });
          });
      }}
    />
  );
};

export default AdminCheck;
