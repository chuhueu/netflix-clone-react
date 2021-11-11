import React, { useRef, useEffect, useState } from "react";
import './paypal.scss'
import axios from "../../axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
const PayPal = ({ plan }) => {
  const [info, setInfo] = useState({});
  const paypalRef = useRef();
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: plan.name,
                amount: {
                  currency_code: plan.currency,
                  value: plan.price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setInfo(order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypalRef.current);
  }, [plan]);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (info) {
      //upload giao dịch lên database
      const transaction = async () => {
        try {
          const res = await axios.post("/transaction", {
            headers: {
              token:
                "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
            },
            date: info.create_time,
            package: info.purchase_units[0].description,
            userID: user._id,
            username: user.username,
            amount: info.purchase_units[0].amount.value,
            status: info.status
          })
          console.log(res.data);
          <Popup
            trigger={
              <span >New and Popular</span>
            }
            modal
            nested
          >
            {close => (
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <div className="header">Oops!</div>
                <div className="content">
                  You are not logged in. Please login to use this feature
                </div>
                <div className="actions">

                </div>
              </div>
            )}
          </Popup>
          // alert(`Ban đã thanh toán thành công gói ${info.purchase_units[0].description}`)
          localStorage.setItem("plans", JSON.stringify(info.purchase_units[0].description));
        } catch (error) {
          console.log(error);
        }
      }
      transaction();
      //chuyển trạng thái user đã thanh toán
      // const status = async () => {
      //   try {

      //   } catch (error) {
      //     console.log(error);
      //   }
      // }
    }
  }, [info, user._id, user.username])
  return (
    <div>
      <div ref={paypalRef}></div>
    </div>
  );
}

export default PayPal
