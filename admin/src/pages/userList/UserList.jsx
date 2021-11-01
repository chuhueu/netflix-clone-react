import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import { deleteUser, getUsers, updateStatus } from "../../context/userContext/apiCalls"
import { TransContext } from "../../context/transactionContext/TransContext";
import { getTransactions } from "../../context/transactionContext/apiCall"
import axios from "../../axios";

export default function UserList() {
  const { users, dispatch } = useContext(UserContext);
  const { transactions, dispatchTrans } = useContext(TransContext);

  useEffect(() => {
    getTransactions(dispatchTrans);
  }, [dispatchTrans]);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  useEffect(() => {
    users.forEach((user) => {
      transactions.forEach((trans) => {
        if (user._id === trans.userID) {
          const getU = async () => {
            try {
              await axios.put("/users/" + user._id, {
                headers: {
                  token:
                    "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                },
                status: "COMPLETED"
              });
            } catch (error) {
              console.log(error);
            }
          }
          getU();
        }
      })
    })
  }, [users, transactions, dispatch])

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
    alert("Delete successfully")
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.profilePic} alt={params.row.username} />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "status", headerName: "Status", width: 120, },
    { field: "transaction", headerName: "Transaction Volume", width: 160, },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{ pathname: "/user/" + params.row._id, user: params.row }}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        id={Math.random()}
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
}
