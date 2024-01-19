import React, {Component} from 'react'
import Burger from '../../components/burger/burger'
import BuildControls from '../../components/burger/buildControls/buildControls'
import Modal from '../../components/ui/modal/modal'
import OrderSummary from '../../components/burger/orderSummary/orderSummary'
import axios from '../../axios'
import Spinner from '../../components/ui/spinner/spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Aux from '../../hoc/auxi/auxiliary'

const INGREDIENT_PRICES = {
  bacon: 0.5,
  cheese: 0.7,
  meat: 0.4,
  salad: 1.3
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false
  }

  componentDidMount() {
    axios.get("https://burgerbuilder-app-5c63b-default-rtdb.asia-southeast1.firebasedatabase.app/orders/ingredients.json")
      .then(response => {
        this.setState({
          ingredients: response.data
        })
      })
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updateCount;
    const oldPrice = this.state.totalPrice;
    const additionPrice = INGREDIENT_PRICES[type];
    const newPrice = oldPrice + additionPrice;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    })
    this.updatePurchaseHandler(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updateCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updateCount;
    const oldPrice = this.state.totalPrice;
    const additionPrice = INGREDIENT_PRICES[type];
    const newPrice = oldPrice - additionPrice;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    })
    this.updatePurchaseHandler(updatedIngredients);
  }

  updatePurchaseHandler = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, prev) => {
        return sum + prev
      }, 0)
    this.setState({ purchaseable: sum > 0 })
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelledHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinuedHandler = () => {
    this.setState({
      loading: true
    })
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Max Schwarzmüller',
        address: {
          street: 'Teststreet 1',
          zipCode: '41351',
          country: 'Germany'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => this.setState({
        loading: false,
        purchasing: false
      }))
      .catch(err => this.setState({
        loading: false,
        purchasing: false
      }))
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = <Spinner />
    let orderSummary = null;

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger
            ingredients={this.state.ingredients}
          />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseHandler} />
        </Aux>
      )
      orderSummary =  <OrderSummary 
          price={this.state.totalPrice}
          ingredients={this.state.ingredients} 
          cancelledHandler={this.purchaseCancelledHandler}
          continuedHandler={this.purchaseContinuedHandler}
      />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelledHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)