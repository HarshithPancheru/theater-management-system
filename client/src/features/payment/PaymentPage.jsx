import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Button from "../../components/Button/Button";
import Alert from "../../components/Alert/Alert";
import { useLocation } from "react-router-dom";

// Load Stripe with your publishable key from .env
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState(null);

  // ✅ Get booking details passed from BookingSummary
  const location = useLocation();
  const { showId, category, finalPrice } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    try {
      // Call backend to create PaymentIntent
      const res = await fetch("http://localhost:5000/api/payment/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Stripe expects amount in smallest currency unit (paise for INR)
        body: JSON.stringify({ amount: finalPrice * 100, currency: "inr" }),
      });

      const { clientSecret } = await res.json();

      // Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setStatus(`Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
        setStatus("Payment successful!");
        // ✅ Optional: send booking + payment details to backend for storage
        await fetch("http://localhost:5000/api/bookings/confirm-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            showId,
            category,
            finalPrice,
            paymentIntentId: result.paymentIntent.id,
          }),
        });
      }
    } catch (err) {
      setStatus("Payment failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow"
    >
      <h2 className="text-xl font-bold mb-4">Payment</h2>

      {/* Show booking details */}
      {finalPrice && (
        <div className="mb-4 text-sm text-gray-700">
          <p>Show ID: {showId}</p>
          <p>Category: {category}</p>
          <p>Amount to Pay: ₹{finalPrice}</p>
        </div>
      )}

      <CardElement className="border p-2 rounded mb-4" />
      <Button type="submit" disabled={!stripe}>
        Pay Now
      </Button>
      {status && <Alert type="info" message={status} />}
    </form>
  );
}

export default function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
