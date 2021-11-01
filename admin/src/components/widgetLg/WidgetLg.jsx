import { useEffect, useState } from "react";
import axios from "../../axios";
import "./widgetLg.css";

export default function WidgetLg() {
  const [newTransactions, setNewTransactions] = useState([]);

  useEffect(() => {
    const getNewTransactions = async () => {
      try {
        const res = await axios.get("/transaction", {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        })
        setNewTransactions(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getNewTransactions();
  }, []);
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
          {newTransactions.map((transaction) => (
            <tr className="widgetLgTr" key={transaction._id}>
              <td className="widgetLgUser">
                <img
                  src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/bf6e4a33850498.56ba69ac3064f.png"
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgName">{transaction.username}</span>
              </td>
              <td className="widgetLgDate">{new Date(`${transaction.date}`).toLocaleDateString('en-US')}</td>
              <td className="widgetLgAmount">${transaction.amount}.00</td>
              <td className="widgetLgStatus">
                <p>{transaction.status}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
