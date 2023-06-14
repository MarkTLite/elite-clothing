import { Routes, Route } from "react-router-dom";
import "./shop-styles.scss";
import CategoryPreviewsPage from "../CategoryPreviewsPage/categories-page-component";
import CategoryPage from "../CategoryPage/cat-page-component";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFetchCategoriesStart } from "../../store/categories/categories-action";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFetchCategoriesStart());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoryPreviewsPage />} />
      <Route path=":category" element={<CategoryPage />} />
    </Routes>
  );
};

export default Shop;
