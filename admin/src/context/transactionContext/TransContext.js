import TransReducer from "./TransReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  transactions: [],
  isFetching: false,
  error: false,
};

export const TransContext = createContext(INITIAL_STATE);

export const TransContextProvider = ({ children }) => {
  const [state, dispatchTrans] = useReducer(TransReducer, INITIAL_STATE);
  //useReducer function nhận vào reducer và initialState khởi tạo ban đầu, trả về state hiện tại và dispatch function dùng để trigger 1 action
  return (
    <TransContext.Provider
      value={{
        transactions: state.transactions,
        isFetching: state.isFetching,
        error: state.error,
        dispatchTrans,
      }}
    >
      {children}
    </TransContext.Provider>
  );
};
