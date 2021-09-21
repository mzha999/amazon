import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from './StateContext'
import { getBasketTotal } from './Reducer'
import { useHistory } from "react-router-dom";

const Subtotal = ({ basket }) => {

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal {basket.length} items: <strong>{value}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)} 
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        
      />

      <button>Proceed to Checkout</button>
    </div>
  );
};

export default Subtotal;
