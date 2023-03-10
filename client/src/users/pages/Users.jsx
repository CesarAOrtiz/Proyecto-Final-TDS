import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Formik, Form } from "formik";
import Modal from "../../components/Modal";
import { signup } from "../../firebase/auth";
import { addWithId, USERS } from "../../firebase/firestore";
import submitWithAlerts from "../../utils/submitWithAlerts";
import UsersForm from "../components/UserForm";
import UsersTable from "../components/UserTable";
import { initialValues, validationSchema } from "../components/userValidationSchema";

const config = {
  confirm: {
    title: "¿Seguro que desea crear este usuario?",
    confirmButtonColor: "#992127",
    confirmButtonText: "Si, crear",
  },
  success: { title: "Usuario creado" },
  error: { confirmButtonColor: "#992127" },
};

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
            const submit = async () => {
              const user = await signup(values.email, values.password);
              delete values.password;
              await addWithId(USERS, user.uid, { ...values, uid: user.uid, active: true });
            };
            await submitWithAlerts(submit, config);
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
