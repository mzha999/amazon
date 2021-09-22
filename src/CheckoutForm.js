import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./Reducer";
import { useStateValue } from "./StateContext";
import { useHistory } from "react-router-dom";
import axios from "./axios";
import { db, auth } from "./firebase";

const CheckoutForm = () => {
  const [{ basket }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const [disabled, setDisabled] = useState();
  const [processing, setProcessing] = useState();
  const [succeeded, setSucceeded] = useState();
  const [clientSecret, setClientSecret] = useState();
  const history = useHistory();
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payment/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret.client_secret);
    };
    getClientSecret();
  }, [basket]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: elements.getElement(CardElement),
    // });
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        db.collection("users")
          .doc(auth.currentUser?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });
        setSucceeded(true);
        setProcessing(false);
        dispatch({
          type: "EMPTY_BASKET",
        });
        history.replace("./orders");
      });
  };
  const handleChange = (e) => {
    setDisabled(e.empty);
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement onChange={handleChange} />
      <div className="panyment_container">
        <CurrencyFormat
          renderText={(value) => <h3>Order Total: {value}</h3>}
          decimalScale={2}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      </div>
      <button type="submit" disabled={processing || disabled || succeeded}>
        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
      </button>
    </form>
  );
};

const PaymentPage = () => {
  const promise = loadStripe(
    "pk_test_51JcH4HEMZpwOjq9J6gOSZN4VSPCkOuI5WZhDPrwyVKWvVrMBtFyyR6RABUVJEAVECfBSogYZ1B9Aixwtdt6scFGu00K6X35D7m"
  );
  return (
    <Elements stripe={promise}>
      <CheckoutForm />
    </Elements>
  );
};
export default PaymentPage;
