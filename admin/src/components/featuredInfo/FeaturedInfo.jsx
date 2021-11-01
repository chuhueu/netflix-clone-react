import { useEffect, useState, useMemo } from "react";
import axios from "../../axios";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  const [newTransactions, setNewTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const date = new Date().getMonth();
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const [monthTrans, setMonthTrans] = useState([{name: MONTHS[date], amount: total}]);
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
  useEffect(() => {
    const getStatsTransaction = async () => {
      try {
        const res = await axios.get("transaction/stats", {
          headers: {
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        })
        res.data.map((item) => {
          setMonthTrans((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "amount": item.total },
          ])
        });
      } catch (error) {
        console.log(error);
      }
    }
    getStatsTransaction();
  }, [MONTHS])
  useEffect(() => {
    let sum = 0;
    newTransactions.forEach((transaction) => {
      sum += transaction.amount;
      //let date = new Date(transaction.date);
    })
    setTotal(sum);
  }, [newTransactions])
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Total</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${total}.00</span>
          <span className="featuredMoneyRate">
            -11.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">{monthTrans[monthTrans.length-1].name}</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${monthTrans[monthTrans.length-1].amount}.00</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
      </div>
    </div>
  );
}
