import React, { useEffect, useState } from "react";
import api from "../api";

function Payments() {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async() => {
        try {
            const response = await api.get("payments/");
            setPayments(response.data);
        } catch (error) {
            console.error("Error fetching payments:", error);
        }
    };

    const handlePayment = async(projectId) => {
        try {
            await api.post(`payments/${projectId}/`);
            alert("Payment Successful!");
            fetchPayments();
        } catch (error) {
            console.error("Error processing payment:", error);
        }
    };

    return ( <
        div >
        <
        h2 > Payments < /h2> {
            payments.length > 0 ? (
                payments.map((payment) => ( <
                    div key = { payment.id }
                    className = "payment-card" >
                    <
                    h3 > { payment.project.name } < /h3> <
                    p > Amount: { payment.amount }
                    Credits < /p> <
                    p > Status: { payment.status } < /p> {
                        payment.status === "Pending" && ( <
                            button onClick = {
                                () => handlePayment(payment.project.id) } > Pay Now < /button>
                        )
                    } <
                    /div>
                ))
            ) : ( <
                p > No pending payments. < /p>
            )
        } <
        /div>
    );
}

export default Payments;