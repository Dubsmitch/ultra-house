import React, { useState } from 'react';
import styles from './Product.module.css';
import { ProductType } from '../storeInfo/StoreInfo';

interface ProductProps {
  item: ProductType
}


const Product: React.FC<ProductProps> = ({item}:ProductProps) => {

  // const [selectedDay, setSelectedDay] = useState<eventObj>({})

  return (
    <div className={styles.Product}>
      I'm a product
      {item.testMode && <div> I am a test product </div>}
      <div> {item.productName} </div>
      <div> {item.description} </div>
      <div> {item.cost} </div>
      <button onClick={()=> window.open(item.paymentLink)}> {item.paymentLinkText} </button>
    </div>
  );
}

export default Product;