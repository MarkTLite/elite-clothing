import { Fragment, useContext } from "react";
import CategoryPreview from "../../components/category-preview/cat-preview-component";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/categories-selector";

const CategoryPreviewsPage = () => {
const categories = useSelector(selectCategoriesMap);
  return (
    <Fragment>
      {Object.keys(categories).map((title) => {
        const products = categories[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  )
}

export default CategoryPreviewsPage;
