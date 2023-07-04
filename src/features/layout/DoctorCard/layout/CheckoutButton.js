import { useEffect, useState } from "react";
import api from "../../../../api/api";

function CheckoutButton({ appointmentId, hasAppointments }) {
  const [checkoutUrl, setCheckoutUrl] = useState(null);

  const handleCheckout = () => {
    api
      .post(`/payment/create-checkout-session/${appointmentId}/`)
      .then((res) => {
        setCheckoutUrl(res.data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (checkoutUrl) {
      // Redirect the user to the Stripe checkout page
      window.location.href = checkoutUrl;
    }
  }, [checkoutUrl]);

  let buttonText = "";

  if (!hasAppointments) {
    buttonText = "No Appointments Yet";
  } else if (hasAppointments && !appointmentId) {
    buttonText = "Select An Appointment";
  } else {
    buttonText = "Book An Appointment";
  }

  return (
    <button
      className={`btn btn-primary w-100`}
      onClick={handleCheckout}
      disabled={!appointmentId}
    >
      {buttonText}
    </button>
  );
}

export default CheckoutButton;
