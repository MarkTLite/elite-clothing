require("dotenv").config();
const secret_key = process.env.VITE_STRIPE_SECRET_KEY;
const stripe = require("stripe")(secret_key);

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return {
      statusCode: 200,
      body: JSON.stringify(paymentIntent),
    };
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      body: JSON.stringify(error),
    };
  }
}
