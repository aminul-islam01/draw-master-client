import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import UseAxios from "../../../hooks/UseAxios";
import UseAuth from "../../../hooks/UseAuth";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";


const CheckoutForm = ({ paymentClassData }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [axiosSecure] = UseAxios();
    const [clientSecret, setClientSecret] = useState('');
    const {user} = UseAuth();
    const [transactionId, setTransactionId] = useState();
    const [processing, setProcessing] = useState(false);

    const {price} = paymentClassData;
    const totalPrice = parseFloat(price.toFixed(2))

    useEffect(() => {
       if(totalPrice > 0){
        axiosSecure.post('/create-payment-intent', { totalPrice })
        .then(res => {
            setClientSecret(res.data.clientSecret)
        })
       }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setTransactionId("");
            setCardError(error.message);
        } else {
            setCardError('');
            console.log('[PaymentMethod]', paymentMethod);
        }
        setProcessing(true);

        const { paymentIntent, error:confirmError } = await stripe.confirmCardPayment(clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'anonymous',
                        email: user?.email || 'unknown',
                    },
                },
            },
        );
        if(confirmError) {
            setCardError(confirmError.message)
        }
        setProcessing(false)
       
          if(paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id)
            const payment = {
                email: user?.email, 
                transactionId: paymentIntent.id,
                price,
                data: new Date(),
                status: "service pending",
            }

            axiosSecure.post('/payments', payment)
            .then(res => {
                if(res.data.insertedId){
                    Swal.fire({
                        icon: 'success',
                        title: 'Payment success full',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
          }
         
    }

    return (
        <div className="bg-slate-100 h-full"> 
            <SectionTitle subHeading="Payment" heading="Payment Now">
            </SectionTitle>
            <form onSubmit={handleSubmit} className="md:w-1/2  mx-auto bg-white">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe || !clientSecret || processing} className="btn btn-primary btn-sm mt-5">
                    Pay
                </button>
            </form>
            {cardError && <p className="text-red-600 text-center">{cardError}</p>}
            {transactionId && <p className="text-green-600 text-center">Transaction complete with transaction Id:  {transactionId}</p>}
        </div>
    );
};

export default CheckoutForm;