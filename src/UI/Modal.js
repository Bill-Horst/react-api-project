import React from 'react';
import { Link } from 'react-router-dom';
import './Modal.scss';

const Modal = props => {
  if (props.show) {
    return (
      <div>
        <div className='modal-body'>
          <div className='forefront'>
            <h1 className='modal-title'>{props.product.name}</h1>
            <h2 className='modal-description'>{props.product.description}</h2>
            <h3 className='modal-manufacturer'>Manufacturer: {props.product.manufacturer.name} ({props.product.manufacturer.location})</h3>
            <div className='modal-buttons'>
              <button className='modal-cancel' onClick={props.cancel}>Cancel</button>
              <Link className='modal-add-to-cart custom-button' onClick={props.addToCart} to='/cart'>Add to cart</Link>
            </div>
          </div>
        </div >
      </div >
    );
  } else {
    return (
      null
    );
  }
};

export default Modal;
