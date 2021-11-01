import "./transactionList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { TransContext } from "../../context/transactionContext/TransContext";
import { deleteTransaction, getTransactions } from "../../context/transactionContext/apiCall"

export default function TransactionList() {
  const { transactions, dispatchTrans } = useContext(TransContext);

  useEffect(() => {
    getTransactions(dispatchTrans);
  }, [dispatchTrans]);

  const handleDelete = (id) => {
    deleteTransaction(id, dispatchTrans);
    alert("Delete successfully")
  };

  const columns = [
    { field: "date",
       headerName: "DATE",
       width: 200,
       renderCell: (params) => {
           return(
               <div>{new Date(`${params.row.date}`).toLocaleString('en-US')}</div>
           )
       }
    },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/bf6e4a33850498.56ba69ac3064f.png" alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "package",
      headerName: "Package",
      width: 160,
    },
    {
        field: "amount",
        headerName: "Amount",
        width: 160,
        renderCell: (params) => {
            return(
                <h3 style={{fontWeight:"bold"}}>{params.row.amount}.00$</h3>
            )
        }
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{pathname: "/user/" +params.row._id, user: params.row}}>
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
        rows={transactions}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
