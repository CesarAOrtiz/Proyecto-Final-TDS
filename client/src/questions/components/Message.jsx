import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

function Message({ children: content, role, ...props }) {
  return (
    <Paper
      sx={{
        padding: 1,
        margin: 1,
        maxWidth: "70%",
        flexShrink: 0,
        height: "fit-content",
        textAlign: role === "user" ? "end" : "start",
        bgcolor: role === "user" ? "primary.main" : "grey.100",
        color: role === "user" ? "primary.contrastText" : "grey.900",
      }}
      {...props}
    >
      <Typography variant="body1">{content}</Typography>
    </Paper>
  );
}

export default Message;
