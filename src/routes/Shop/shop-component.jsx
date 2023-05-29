import { Fragment, useContext } from "react";
import { ProductsContext } from "../../contexts/product-context";

import './shop-styles.scss';
import ProductCard from "../../components/product-card/product-card-component";

const Shop = () => {
  const {products} = useContext(ProductsContext);

    return(
      <Fragment>
        <h2>SHOP</h2>
        <div className="products-container">
          {
            products.map((product)=>{
              return (
                <ProductCard key={product.id} product={product} />
              )
            })
          }
        </div>
      </Fragment>
    )
  }

  export default Shop;
