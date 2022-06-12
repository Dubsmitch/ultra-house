import React, { useState, useEffect } from 'react';
import styles from './Store.module.css';
import { StoreInfo, ProductType } from './storeInfo/StoreInfo';
import Product from './product/Product';

interface StoreProps {
  props: any
}

// interface ProductState {
//   selectedDayText?: string,
//   events?: eventDatesInterface,
// }

const Store: React.FC<StoreProps> = ({props}) => {

  const [productsInStore, setProductsInStore] = useState<Array<ProductType> | null>()

  useEffect (() => {
    console.log('store info', StoreInfo);
    setProductsInStore(StoreInfo);
  }, []);

  const renderStoreItems = () => {
    return productsInStore.map((storeItem) => {
      return <Product item={storeItem} />
    })
  }

  return (
    <div className={styles.Store}>
      I'm The Store
      {productsInStore && renderStoreItems()}
    </div>
  );
}

export default Store;