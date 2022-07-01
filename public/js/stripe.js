/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51LFuYBFFi4IY1dUXzg297KRvQmktdnqDV7hsq7sl5N6tYu9s7EnZtYSFk5UZOSQXLVDjQwiJvHhkguP7SIP0nEzU00qaO7HOB2'
);

export const bookTour = async tourId => {
  try {
    // 1) GET checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + charge credict card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
