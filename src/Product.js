import React from "react";
import "./Product.css";
import { useStateValue } from "./StateContext";
const Product = ({ id, title, image, price, rating }) => {
    const[, dispatch] = useStateValue()

    const AddToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating
            }
        })
    }
  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>🌟</p>
            ))}
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={AddToBasket}>Add to basket</button>
    </div>
  );
};

export default Product;
