//Reducer: một hàm có 2 tham số là state, action và trả về new state sau khi thực hiện một action
const TransReducer = (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS_START":
      return {
        transactions: [],
        isFetching: true,
        error: false,
      };
    case "GET_TRANSACTIONS_SUCCESS":
      return {
        transactions: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_TRANSACTIONS_FAILURE":
      return {
        transaction: [],
        isFetching: false,
        error: false,
      };

    case "DELETE_TRANSACTION_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_TRANSACTION_SUCCESS":
      return {
        transactions: state.transactions.filter((transaction) => transaction._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_TRANSACTION_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default TransReducer;
