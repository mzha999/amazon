import React, { useEffect, useState } from "react";
import "./Orders.css";
import { db, auth } from "./firebase";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from './Reducer'
const Orders = ({ order }) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (auth) {
      db.collection("users")
        .doc(auth.currentUser?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, []);
  return (
    <div className="order">
      <h2>Orders</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order_id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item) => (
        <CheckoutProduct
          key={item.id}
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal {order.data.basket?.length} items: <strong>{value}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={order.data.amount /100} 
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        
      />
    </div>
  );
};

export default Orders;
