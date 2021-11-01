import axios from "../../axios";
import {
  deleteTransactionFailure,
  deleteTransactionStart,
  deleteTransactionSuccess,
  getTransactionsFailure,
  getTransactionsStart,
  getTransactionsSuccess,
} from "./TransAction";

//get
export const getTransactions = async (dispatch) => {
    dispatch(getTransactionsStart());
    try {
      const res = await axios.get("/transaction", {
        headers: {
          token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      dispatch(getTransactionsSuccess(res.data));
    //   console.log(res.data);
    } catch (error) {
      dispatch(getTransactionsFailure());
    }
};

//delete
export const deleteTransaction = async (id, dispatch) => {
    dispatch(deleteTransactionStart());
    try {
        await axios.delete("/transaction/" + id, {
            headers: {
                token: "Bearer" + JSON.parse(localStorage.getItem('user')).accessToken,
            }
        })
        dispatch(deleteTransactionSuccess(id));
    } catch (error) {
        dispatch(deleteTransactionFailure());
    }
};
