import React, { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form } from "formik";
import Modal from "../../components/Modal";
import { signup } from "../../firebase/auth";
import { addWithId, USERS } from "../../firebase/firestore";
import UsersForm from "../components/UserForm";
import UsersTable from "../components/UserTable";
import { initialValues, validationSchema } from "../components/userValidationSchema";
import * as Swal from "sweetalert2";

const errorMessages = {
  "auth/email-already-in-use": "El correo ya esta en uso",
  "auth/invalid-email": "El correo no es valido",
  "auth/weak-password": "La contraseña debe tener al menos 6 caracteres",
  default: "Error al crear el usuario",
};

const loader = () =>
  Swal.fire({
    didOpen: () => Swal.showLoading(),
    didClose: () => Swal.hideLoading(),
    title: "Espere un momento",
    text: "Estamos procesando su información",
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    showConfirmButton: false,
    icon: "info",
  });

const uploadAlert = () =>
  Swal.fire({
    title: "¿Seguro que desea crear este usuario?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#992127",
    confirmButtonText: "Si, crear",
    cancelButtonText: "Cancelar",
  });

export function Users(props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        style={{
          flexGrow: 1,
          flexDirection: "row-reverse",
          display: "flex",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "primary.dark" } }}
        >
          <Box sx={{ display: { xs: "none", sm: "block" }, mx: 1 }}>
            <Typography>Crear Usuario</Typography>
          </Box>
          <PersonAddIcon />
        </Button>
      </Box>

      <UsersTable />

      <Modal open={open} onClose={() => setOpen(false)} style={{ width: "80%", maxWidth: 500 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">
            Agregar
          </Typography>
          <Button onClick={() => setOpen(false)} variant="outlined" color="error">
            <CloseIcon />
          </Button>
        </div>
        <hr />
        {/* TODO manejar todos los errores  */}
        <Formik
          onSubmit={async (values, { resetForm }) => {
            uploadAlert()
              .then(async (response) => {
                if (!response.isConfirmed) return;
                loader();
                const user = await signup(values.email, values.password);
                delete values.password;
                await addWithId(USERS, user.uid, { ...values, uid: user.uid, active: true });
                return response;
              })
              .then((response) => {
                if (!response) return;
                Swal.fire({
                  title: "Usuario creado",
                  icon: "success",
                });
              })
              .catch((error) => {
                Swal.fire({
                  title: "Ha ocurrido un error",
                  text: errorMessages[error.code] || errorMessages.default,
                  icon: "error",
                  confirmButtonColor: "#992127",
                });
              });

            resetForm();
            setOpen(false);
          }}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <Form>
            <UsersForm />
          </Form>
        </Formik>
      </Modal>
    </>
  );
}

export default Users;
