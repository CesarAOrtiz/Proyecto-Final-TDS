import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form } from "formik";
import { useAuth } from "../../auth/contexts/AuthContext";
import { update, USERS } from "../../firebase/firestore";
import { setEmail, setPassword, reauthenticate } from "../../firebase/auth";
import CustomField from "../../components/CustomField";
import Modal from "../../components/Modal";
import {
  nameValidation,
  emailValidation,
  passwordValidation,
} from "../components/userValidationSchema";
import * as Swal from "sweetalert2";

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

const reload = () =>
  Swal.fire({
    title: "Para realizar esta acción es necesario confirmar su contraseña",
    input: "password",
    inputAttributes: { autocapitalize: "off" },
    showCancelButton: true,
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#992127",
    showLoaderOnConfirm: true,
    preConfirm: (password) => {
      return reauthenticate(password)
        .then((response) => response)
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            Swal.showValidationMessage("Contraseña incorrecta");
          } else if (error.code === "auth/internal-error") {
            Swal.showValidationMessage(`Debe ingresar una contraseña válida`);
          } else {
            Swal.showValidationMessage(`Ha ocurrido un error: ${error}`);
          }
        });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  });

export const Profile = () => {
  const { currentUser, userData } = useAuth();
  const [open, setOpen] = useState({
    name: false,
    email: false,
    password: false,
  });
  const handleOpen = (field) => {
    setOpen({ ...open, [field]: true });
  };
  const handleClose = (field) => {
    setOpen({ ...open, [field]: false });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={4}>
          <Button
            onClick={() => handleOpen("name")}
            variant="contained"
            color="primary"
            sx={{ bgcolor: "primary.main" }}
            fullWidth
          >
            Actualizar Nombe
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Button
            onClick={() => handleOpen("email")}
            variant="contained"
            color="primary"
            sx={{ bgcolor: "primary.main" }}
            fullWidth
          >
            Actualizar Email
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Button
            onClick={() => handleOpen("password")}
            variant="contained"
            color="primary"
            sx={{ bgcolor: "primary.main" }}
            fullWidth
          >
            Actualizar Contraseña
          </Button>
        </Grid>

        <Modal
          open={open.name}
          onClose={() => handleClose("name")}
          style={{ width: "80%", maxWidth: 500 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" fontWeight="bold">
              Actualizar Nombre
            </Typography>
            <Button onClick={() => handleClose("name")} variant="outlined" color="error">
              <CloseIcon />
            </Button>
          </div>
          <hr />

          <Formik
            onSubmit={async ({ name }, { resetForm }) => {
              reload()
                .then(async (response) => {
                  if (!response.isConfirmed) return;
                  loader();
                  await update(USERS, currentUser.uid, { name });
                  return response;
                })
                .then((response) => {
                  if (!response) return;
                  Swal.fire({
                    title: "Nombre actualizado",
                    icon: "success",
                  });
                })
                .catch((error) => {
                  Swal.fire({
                    title: "Ha ocurrido un error",
                    text: error,
                    icon: "error",
                    confirmButtonColor: "#992127",
                  });
                });
              resetForm();
              handleClose("name");
            }}
            initialValues={{ name: userData?.name }}
            validationSchema={nameValidation}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomField autoFocus type="text" name="name" label="Nombre" as={TextField} />
                </Grid>

                <Grid item xs={12}>
                  <Button variant="contained" color="success" fullWidth type="submit">
                    Enviar
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Modal>

        <Modal
          open={open.email}
          onClose={() => handleClose("email")}
          style={{ width: "80%", maxWidth: 500 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" fontWeight="bold">
              Actualizar Email
            </Typography>
            <Button onClick={() => handleClose("email")} variant="outlined" color="error">
              <CloseIcon />
            </Button>
          </div>
          <hr />

          <Formik
            onSubmit={async ({ email }, { resetForm }) => {
              reload()
                .then(async (response) => {
                  if (!response.isConfirmed) return;
                  loader();
                  await setEmail(email);
                  await update(USERS, currentUser.uid, { email });
                  return response;
                })
                .then((response) => {
                  if (!response) return;
                  Swal.fire({
                    title: "Email actualizado",
                    icon: "success",
                  });
                })
                .catch((error) => {
                  Swal.fire({
                    title: "Ha ocurrido un error",
                    text: error,
                    icon: "error",
                    confirmButtonColor: "#992127",
                  });
                });
              resetForm();
              handleClose("email");
            }}
            initialValues={{ email: currentUser.email }}
            validationSchema={emailValidation}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomField autoFocus type="email" name="email" label="Email" as={TextField} />
                </Grid>

                <Grid item xs={12}>
                  <Button variant="contained" color="success" fullWidth type="submit">
                    Enviar
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Modal>

        <Modal
          open={open.password}
          onClose={() => handleClose("password")}
          style={{ width: "80%", maxWidth: 500 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" fontWeight="bold">
              Actualizar Contraseña
            </Typography>
            <Button onClick={() => handleClose("password")} variant="outlined" color="error">
              <CloseIcon />
            </Button>
          </div>
          <hr />

          <Formik
            onSubmit={async ({ password }, { resetForm }) => {
              reload()
                .then(async (response) => {
                  if (!response.isConfirmed) return;
                  loader();
                  await setPassword(password);
                  return response;
                })
                .then((response) => {
                  if (!response) return;
                  Swal.fire({
                    title: "Contraseña actualizado",
                    icon: "success",
                  });
                })
                .catch((error) => {
                  Swal.fire({
                    title: "Ha ocurrido un error",
                    text: error,
                    icon: "error",
                    confirmButtonColor: "#992127",
                  });
                });
              resetForm();
              handleClose("password");
            }}
            initialValues={{ password: "" }}
            validationSchema={passwordValidation}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomField
                    autoFocus
                    type="password"
                    name="password"
                    label="Contraseña"
                    as={TextField}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button variant="contained" color="success" fullWidth type="submit">
                    Enviar
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Modal>
      </Grid>
    </>
  );
};

export default Profile;
