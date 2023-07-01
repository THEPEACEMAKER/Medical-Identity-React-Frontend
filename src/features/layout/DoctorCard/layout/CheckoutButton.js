import { useEffect, useState } from "react";
import api from "../../../../api/api";

function CheckoutButton({ appointmentId }) {
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

  //   success -> redirect to http://localhost:3000/?/success=true -> order/:orderId
  //   cancel -> redirect to http://localhost:3000/?/canceled=true -> cancel or error

  return (
    <button className={`btn btn-primary w-100`} onClick={handleCheckout}>
      Book An Appointment
    </button>
  );
}

export default CheckoutButton;
