import React from 'react';

const PurchaseItem = ({ product, provider, price, quantity, date }) => {
     



  return (
    <div className="purchase-item">
      <div className="purchase-product-image"></div>
      <div className="purchase-product-details">
        <p>{product}</p>
        <p>{provider}</p>
        <p>{price}</p>
        <p>{quantity}</p>
        <p>{date}</p>
      </div>
    </div>
  );
};

export default PurchaseItem;