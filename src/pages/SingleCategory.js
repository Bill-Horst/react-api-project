import React from 'react';
import { withRouter } from 'react-router-dom';
import Modal from '../UI/Modal';
import Product from '../components/Product';
import './SingleCategory.scss';

class SingleCategory extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      categoryName: '',
      showModal: false,
      currentProduct: {}
    };
  }

  showModal = product => {
    this.setState({
      showModal: true,
      currentProduct: product
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      currentProduct: null
    });
  }

  addToCart = (product) => {
    let lsCart = localStorage.getItem('cart');
    lsCart = lsCart ? JSON.parse(lsCart) : [];
    lsCart.push(product);
    localStorage.setItem('cart', JSON.stringify(lsCart));

  }

  getLowestPrice = product => {
    let prices = [];
    product.variants.forEach(variant => {
      prices.push(variant.prices.regular);
    });
    return Math.round(prices.sort((a, b) => a - b)[0]);
  }

  componentDidMount() {
    const categoryName = this.props.match.params.name;

    fetch('http://localhost:8081/api/categories?slug=' + categoryName)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
            categoryName
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {

    const { error, isLoaded, items, categoryName, showModal, currentProduct } = this.state;
    const products = items[0] ? items[0].products : [];

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className='main-view-large'>
          <h2>Showing products for category: "{categoryName}"</h2>
          <div className='category-page-product-list'>
            {products.map(product => (
              <div className='product' key={product.name}>
                <Product onClick={e => { this.showModal(product) }} clicked={product => this.showModal(product)} product={product} price={this.getLowestPrice(product)} />
              </div>
            ))}
          </div>
          <Modal show={showModal} product={currentProduct} cancel={this.closeModal} addToCart={() => this.addToCart(currentProduct)} />
        </div>
      );
    }


  }
}

export default withRouter(SingleCategory);