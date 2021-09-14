import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './plansScreen.css';
import PayPal from './PayPal';
const PlansScreen = () => {
    const [plans, setPlans] = useState([]);
    useEffect(() => {
        const getPlans = async () =>{
            try {
                const res = await axios.get("package",{
                    headers: {
                      token:
                      "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
                    },
                  });
                  setPlans(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getPlans();
    },[])
    return (
        <div className="planScreen">
        {plans.map((plan) => {
            return (
                <div className="planScreen_plan" key={plan._id}>
                    <div className="planScreen_info">
                        <h4 className="plan">Netflix {plan.name}</h4>
                        <h6 className="plan">{plan.description}</h6>
                        <h6 className="plan">{plan.price}.00$</h6>
                    </div>
                    <button className="button">
                        <PayPal plan={plan} />
                    </button>
                </div>
            )
        })}
    </div>
    )
}

export default PlansScreen