import React, { useRef, useEffect, useState } from "react";
import './paypal.css'
const PayPal = ({plan}) => {
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
            console.log(order);
            setInfo(order);
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(paypalRef.current);
    }, [plan]);

    return (
      <div>
        <div ref={paypalRef}></div>
        {console.log(info.create_time)}
      </div>
    );
}

export default PayPal
