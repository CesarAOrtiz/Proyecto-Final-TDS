import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonIcon from "@mui/icons-material/Person";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import { DataGrid } from "@mui/x-data-grid";
import * as Swal from "sweetalert2";
import { USERS, onSnap, update } from "../../firebase/firestore";
import AdminCheck from "./AdminCheck";

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

const deleteAlert = () =>
  Swal.fire({
    title: "¿Seguro que desea cambiar el estado de este usuario?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#1565c0",
    confirmButtonText: "Si, cambiar",
    cancelButtonText: "Cancelar",
  });

const columns = [
  { field: "name", headerName: "Nombre", flex: 1, minWidth: 300 },
  { field: "email", headerName: "Email", flex: 1, minWidth: 300 },
  {
    field: "isAdmin",
    headerName: "Es Administrador",
    flex: 1,
    minWidth: 150,
    renderCell: (params) => <AdminCheck user={params.row} />,
  },
  {
    field: "active",
    headerName: "Activo",
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <Tooltip title={params.row.active ? "Desactivar" : "Actvar"}>
        <IconButton
          onClick={async () => {
            deleteAlert()
              .then(async (response) => {
                if (!response.isConfirmed) return;
                loader();
                await update(USERS, params.row.id, { active: !params.row.active });
                return response;
              })
              .then((response) => {
                if (!response) return;
                Swal.fire({
                  title: `Usuario ${params.row.active ? "desactivado" : "activado"}`,
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
        >
          {params.row.active ? <PersonIcon color="success" /> : <NoAccountsIcon color="error" />}
        </IconButton>
      </Tooltip>
    ),
  },
];

export function UsersTable(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsub = onSnap(USERS, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        const data = { ...doc.data(), id: doc.id };
        users.push({
          ...data,
          id: doc.id,
        });
      });
      setUsers(users);
    });
    return unsub;
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        loading={users.length === 0}
      />
    </div>
  );
}

export default UsersTable;
