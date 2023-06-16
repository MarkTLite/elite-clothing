import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button-component";
import * as S from "./payment-from-styles";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart-selector";
import { selectCurrentUser } from "../../store/user/user-selector";

const PaymentForm = () => {
  const stripe = useStripe();
  const element = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);

  const payNowHandler = async (e) => {
    e.preventDefault();

    if (!element || !stripe) return;

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      'method': "post",
      'headers': {
        "Content-type": "application/json",
      },
      'body': JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());
    console.log(response);
    const { client_secret } = response;
    console.log(currentUser)
    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: element.getElement(CardElement),
        billing_details: {
          name: currentUser.email ? currentUser.email : "Guest",
        },
      },
    });
    if (paymentResult.error) {
        console.log('error')
      alert(`Payment failed: error: ${paymentResult.error}`);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("PAyment successful");
      }
    }
  };

  return (
    <S.PaymentFormContainer>
      <S.FormContainer onSubmit={payNowHandler}>
        <h2>Credit Card Payment</h2>
        <CardElement />
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</Button>
      </S.FormContainer>
    </S.PaymentFormContainer>
  );
};

export default PaymentForm;
