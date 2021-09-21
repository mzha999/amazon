import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateContext";
const CheckoutProduct = ({ id, image, title, price, rating }) => {
  const [, dispatch] = useStateValue();
  const removeItemsFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  return (
    <div className="checkoutProduct">
      <img src={image} alt="" className="image" />
      <div className="checkoutProduct_info">
        <p className="checkoutProduct_title">{title}</p>
        <p className="checkoutProduct_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>🌟</p>
            ))}
        </div>
        <button onClick={removeItemsFromBasket}>Remove item</button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
