//Actions : nó là 1 pure object định nghĩa 2 thuộc tính lần lượt là type: kiểu của action
//payload: giá trị tham số mà action creator truyền lên.
export const getTransactionsStart = () => ({
  type: "GET_TRANSACTIONS_START",
});

export const getTransactionsSuccess = (transactions) => ({
  type: "GET_TRANSACTIONS_SUCCESS",
  payload: transactions,
});

export const getTransactionsFailure = () => ({
  type: "GET_TRANSACTIONS_FAILURE",
});

export const deleteTransactionStart = () => ({
  type: "DELETE_TRANSACTION_START",
});

export const deleteTransactionSuccess = (id) => ({
  type: "DELETE_TRANSACTION_SUCCESS",
  payload: id,
});

export const deleteTransactionFailure = () => ({
  type: "DELETE_TRANSACTION_FAILURE",
});
