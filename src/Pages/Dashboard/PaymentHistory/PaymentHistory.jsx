import { useEffect } from "react";
import UseAxios from "../../../hooks/UseAxios";
import UseAuth from "../../../hooks/UseAuth";
import { useState } from "react";
import Time from 'react-time'
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const PaymentHistory = () => {
    const [axiosSecure] = UseAxios();
    const { user } = UseAuth();
    const [paymentHistory, setPaymentHistory] = useState([]);

    useEffect(() => {
        axiosSecure(`/payment-history/${user?.email}`)
            .then(res => setPaymentHistory(res.data))
    }, [axiosSecure, user])

    return (
        <div className="px-5">
            <SectionTitle subHeading="Payment" heading="Payment History">
            </SectionTitle>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead className="bg-amber-600 text-white text-lg">
                        <tr>
                            <th>#</th>
                            <th>TransactionId</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentHistory.map((payment, index) =>
                            <tr key={payment._id}>
                                <th>{index +1}</th>
                                <td>{payment.transactionId}</td>
                                <td>$ {payment.price}</td>
                                <td><Time value={payment.date} format="YYYY/MM/DD HH:mm" /></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;