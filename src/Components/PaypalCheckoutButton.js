import { PayPalButtons } from "@paypal/react-paypal-js";
import { Action } from "@remix-run/router";
import { useState } from "react";
import { createOrder } from "../redux/requests";
import { selectProfile } from '../redux/slices/authSlice'
import { useDispatch, useSelector } from "react-redux";

const PaypalCheckoutButton = ({ orderRequest }) => {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch()
  const user = useSelector(selectProfile);

  const handleApprove = (order) => {
    setPaidFor(true)
    dispatch(createOrder({userId: user.id, statusid: order.status, orderId: order.id, price: order.purchase_units[0].amount.value}))

  }
  return (
    <PayPalButtons style={{
      color: "gold",
      layout: "horizontal",
      tagline: false,
      shape: "pill"
    }}
      onClick={(data, actions) => {
        const hasAlreadyBought = false;
        if (hasAlreadyBought) {
          setError("Проверьте ваши заказы");
          return actions.reject();
        } else {
          actions.resolve();
        }
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: orderRequest.description,
              amount: {
                value: orderRequest.price
              }
            }
          ]
        })
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture()
        console.log("order", order.orderId)
        handleApprove(order)
      }}
      onError={(err) => {
        setError(err);
        console.log("PayPal error", err)
      }}>
    </PayPalButtons>
  );
};

export default PaypalCheckoutButton;