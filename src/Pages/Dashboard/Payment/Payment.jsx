import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { useLoaderData } from "react-router-dom";


const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_PK);
const Payment = () => {
    const paymentClassData = useLoaderData();
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm paymentClassData={paymentClassData}/>
        </Elements>
    );
};

export default Payment;