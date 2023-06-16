import { loadStripe } from "@stripe/stripe-js";

const pub_key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
console.log(pub_key)
export const stripePromise = loadStripe(pub_key);
