import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Card from "@mui/material/Card";

export function TransitionsModal({ children, open, handleClose, style, ...props }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Fade in={open}>
        <Card style={{ padding: 16, margin: 16, ...style }} {...props}>
          {children}
        </Card>
      </Fade>
    </Modal>
  );
}
export default TransitionsModal;
