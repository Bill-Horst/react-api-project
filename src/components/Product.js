import React from 'react';
import './Product.scss';

const Product = props => {

  const productClicked = () => {
    if (props.clicked) {
      props.clicked(props.product);
    }
  }

  return (
    <div onClick={productClicked}>
      <div className='product-card'>
        <div className='product-card-title'>{props.product.name}</div>
        <div className='image-wrapper'>
          <img src={props.product.images[0].url} />
        </div>
        <p className='price'>${props.price}</p>
      </div>
    </div>
  )
}

export default Product;