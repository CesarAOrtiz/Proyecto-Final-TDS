import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import makeStyles from "../styles/loginStyles";
import { login, logout } from "../../firebase/auth";
import { getDocById, USERS } from "../../firebase/firestore";
import { NavLink } from "react-router-dom";

export const LogUsers = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user.email || !user.password) throw new Error("Campos vacíos");
      const logedIn = await login(user.email, user.password);
      const userDoc = await getDocById(USERS, logedIn.user.uid);
      if (!userDoc.data().active) {
        await logout();
        throw new Error("Usuario inactivo");
      }
      navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("Email inválido");
      } else if (error.code === "auth/user-not-found") {
        setError("Usuario no encontrado");
      } else if (error.code === "auth/wrong-password") {
        setError("Usuario o contraseña incorrectos");
      } else if (error.message === "Campos vacíos") {
        setError("Debe llenar todos los campos");
      } else {
        // setError(error.message);
        setError("Ah ocurrido un error");
      }
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginContent}>
        {/* <img style={styles.sistemLogo} src="/img/logo.png" alt="Logo" /> */}

        <h2 style={styles.loginTitle}>Accede a tu cuenta</h2>
        {error && (
          <Alert variant="filled" severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <div style={styles.input1Container}>
            <label htmlFor="email" style={styles.htmlForInputs}>
              Ingresa tu correo institucional
            </label>
            <input
              name="email"
              type="email"
              placeholder="Ingresa tu correo institucional"
              onChange={handleChange}
              style={styles.input1Login}
            />
          </div>
          <div
            style={{
              ...styles.input1Container,
              ...styles.input2Container,
            }}
          >
            <label htmlFor="password" style={styles.htmlForInputs}>
              Ingresa tu contraseña
            </label>
            <input
              name="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              onChange={handleChange}
              style={styles.input1Login}
            />
            <NavLink to="../forgotpassword" color="white" style={styles.backToLogin}>
              Olvidó su contraseña?
            </NavLink>
          </div>

          <Button type="submit" variant="contained" style={styles.logButton}>
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LogUsers;
