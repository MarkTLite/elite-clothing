import { Routes, Route } from "react-router-dom";
import "./shop-styles.scss";
import CategoryPreviewsPage from "../CategoryPreviewsPage/categories-page-component";
import CategoryPage from "../CategoryPage/cat-page-component";
import { useEffect } from "react";
import { setCategoriesMap } from "../../store/categories/categories-action";
import { getCollectionAndDocs } from "../../utils/firebase/firebase-utils";
import { useDispatch } from "react-redux";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesList = await getCollectionAndDocs("products");
      console.log(categoriesList);
      dispatch(setCategoriesMap(categoriesList));
    };
    fetchCategories();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoryPreviewsPage />} />
      <Route path=":category" element={<CategoryPage />} />
    </Routes>
  );
};

export default Shop;
