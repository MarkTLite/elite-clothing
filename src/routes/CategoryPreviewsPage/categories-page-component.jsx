import { Fragment, useContext } from "react";
import CategoryPreview from "../../components/category-preview/cat-preview-component";
import { useSelector } from "react-redux";
import {
  selectCategoriesLoading,
  selectCategoriesMap,
} from "../../store/categories/categories-selector";
import Spinner from "../../components/spinner/spinner-component";

const CategoryPreviewsPage = () => {
  const categories = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesLoading);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categories).map((title) => {
          const products = categories[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </Fragment>
  );
};

export default CategoryPreviewsPage;
