import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CustomField from "../../components/CustomField";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Field } from "formik";

export const UsersForm = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CustomField autoFocus type="text" name="name" label="Nombre" as={TextField} />
      </Grid>
      <Grid item xs={12}>
        <CustomField type="email" name="email" label="Email" as={TextField} />
      </Grid>
      <Grid item xs={12}>
        <CustomField type="password" name="password" label="Contraseña" as={TextField} />
      </Grid>
      <Grid item xs={12}>
        <FormGroup>
          <FormControlLabel
            control={<Field size="small" variant="outlined" name="isAdmin" as={Checkbox} />}
            label="Es Administrador"
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="success" fullWidth type="submit">
          Enviar
        </Button>
      </Grid>
    </Grid>
  );
};

export default UsersForm;
