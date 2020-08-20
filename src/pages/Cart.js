import React from 'react';
import Product from '../components/Product';
import './Cart.scss';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      cartList: []
    };
  }

  componentDidMount() {
    let lsList = [];
    if (localStorage.getItem('cart')) {
      lsList = JSON.parse(localStorage.getItem('cart'));
    }
    this.setState({
      cartList: lsList ? lsList : [],
      isLoaded: true
    });
  }

  makePurchase = () => {
    localStorage.setItem('cart', []);
    this.setState({
      cartList: []
    });
  }

  getLowestPrice = product => {
    let prices = [];
    product.variants.forEach(variant => {
      prices.push(variant.prices.regular);
    });
    return Math.round(prices.sort((a, b) => a - b)[0]);
  }

  getCartTotal = list => {
    let total = 0;
    list.forEach(product => {
      total += this.getLowestPrice(product);
    });
    return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');;
  }

  render() {
    const { isLoaded, cartList } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (cartList.length > 0) {
      return (
        <div className='main-view-large'>
          <h2>Cart</h2>
          <button className='buy-all-button' onClick={this.makePurchase}>Purchase all</button><span>Total: ${this.getCartTotal(cartList)}</span>
          <div className='cart-page-product-list'>
            {cartList.map(product => (
              <div className='product' key={product.name}>
                <Product product={product} price={this.getLowestPrice(product)} />
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className='main-view-large'>
          <h2>Your cart is empty.</h2>
        </div>
      )
    }
  }
}

export default Cart;