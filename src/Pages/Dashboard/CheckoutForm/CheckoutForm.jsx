import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import UseAxios from "../../../hooks/UseAxios";
import UseAuth from "../../../hooks/UseAuth";
import Swal from "sweetalert2";


const CheckoutForm = ({ paymentClassData }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [axiosSecure] = UseAxios();
    const [clientSecret, setClientSecret] = useState('');
    const {user} = UseAuth();
    const [transactionId, setTransactionId] = useState();

    const { price } = paymentClassData;
    const totalPrice = parseFloat(price.toFixed(2))
    console.log(price)

    useEffect(() => {
       if(totalPrice < 0){
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
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
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


        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret,
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
                // console.log(res.data)
                if(res.data.insertResult.insertedId){
                    Swal.fire({
                        icon: 'success',
                        title: 'Payment success full',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
          }

    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                <button type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
            {cardError && <p className="text-red-600">{cardError}</p>}
            {transactionId && <p className="text-green-600">Transaction complete with transaction Id:  {transactionId}</p>}
        </div>
    );
};

export default CheckoutForm;