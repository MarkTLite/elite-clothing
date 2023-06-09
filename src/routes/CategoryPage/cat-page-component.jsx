import { useParams } from "react-router-dom";
import "./cat-page-styles.scss";
import ProductCard from "../../components/product-card/product-card-component";
import { Fragment, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectCategoriesLoading,
  selectCategoriesMap,
} from "../../store/categories/categories-selector";
import Spinner from "../../components/spinner/spinner-component";

// Page whose category content depends on the variable parameter. eg /hats
const CategoryPage = () => {
  const { category } = useParams();
  const categories = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesLoading);
  const [products, setProducts] = useState(categories[category]);

  useEffect(() => {
    setProducts(categories[category]);
  }, [category, categories]);

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-container2">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </Fragment>
  );
};

export default CategoryPage;
