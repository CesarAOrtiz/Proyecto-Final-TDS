import { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import makeStyles from "../styles/loginStyles";
import { resetPassword } from "../../firebase/auth";

export const ForgotPassword = () => {
  const [user, setUser] = useState({ email: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setSuccess("");
      await resetPassword(user.email);
      setSuccess("Check your email for further instructions");
    } catch (error) {
      if (error.code === "auth/missing-email") {
        setError("Debe ingresar un correo electrónico");
      } else if (error.code === "auth/user-not-found") {
        setError("Usuario no encontrado");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginContent}>
        {/* <img style={styles.sistemLogo} src="/img/logo.png" alt="Logo" /> */}

        <h2 style={styles.loginTitle}>Recuperar Contraseña</h2>
        {error && (
          <Alert variant="filled" severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="filled" severity="success" sx={{ my: 2 }}>
            {success}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <div style={styles.input1Container}>
            <label htmlFor="email" style={styles.htmlForInputs}>
              Ingrese su correo electrónico
            </label>
            <input
              name="email"
              type="email"
              placeholder="Ingresa tu correo institucional"
              onChange={handleChange}
              style={styles.input1Login}
            />
            <NavLink to="../login" color="white" style={styles.backToLogin}>
              Iniciar Sesión
            </NavLink>
          </div>

          <Button type="submit" variant="contained" style={styles.logButton}>
            Recuerar Contraseña
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
