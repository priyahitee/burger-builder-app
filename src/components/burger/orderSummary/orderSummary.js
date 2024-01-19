import React from 'react'
import Button from '../../ui/button/button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
  .map(igKey => {
      return (
          <li key={igKey}>
          <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
      </li> );
  })
  return  (
    <div> <h3>Your Order</h3>
    <p>A delicious burger with the following ingredients:</p>
    <ul>
        {ingredientSummary}
    </ul>
    <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
    <p>Continue to Checkout?</p>
    <Button btnType='Danger' clicked={props.cancelledHandler}>CANCEL</Button>
    <Button btnType='Success' clicked={props.continuedHandler}>CONTINUE</Button>
    </div>
  )
}

export default orderSummary;
