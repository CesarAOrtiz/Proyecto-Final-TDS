export const makeStyles = (theme) => ({
  loginContainer: {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
  },
  loginContent: {
    width: "392px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  sistemLogo: {
    width: "100%",
    maxWidth: 350,
    height: 150,
  },
  loginTitle: {
    color: "#FFFFFF",
    fontWeight: 400,
    letterSpacing: 1.2,
    fontSize: 32,
  },
  inputsContainer: {
    minWidth: 393,
  },
  input1Container: {
    width: "100%",
    marginBottom: 20,
  },
  input2Container: {
    marginBottom: 20,
  },
  input1Login: {
    width: "88%",
    padding: 11,
    borderRadius: 5,
    height: 21,
    border: "none",
    outline: "none",
    color: "rgb(0 0 0 / 35%)",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  htmlForInputs: {
    padding: 0,
    float: "left",
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 15,
    fontWeight: 400,
  },
  backToLogin: {
    float: "right",
    color: "#ffffff",
    textDecoration: "none",
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 15,
    fontWeight: 400,
    padding: 11,
    "&:hover": {
      textDecoration: "underline",
      fontWeight: 600,
    },
  },
  containerForgot: {
    display: "flex",
    justifyContent: "end",
  },
  spansColor: {
    color: "white",
    cursor: "pointer",
  },
  createUna: {
    fontSize: 17,
    fontWeight: "bold",
  },
  logButton: {
    width: "94%",
    height: 45,
    outline: "none",
    color: "white",
    border: "none",
    borderRadius: 50,
    fontSize: 18,
    marginBottom: 30,
    fontWeight: "bold",
    cursor: "pointer",
  },
  LoginHover: {
    background: "#0498c0",
    transition: "1s",
  },
});

export default makeStyles;
