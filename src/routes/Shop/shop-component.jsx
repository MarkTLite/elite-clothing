import {Routes, Route} from 'react-router-dom';
import './shop-styles.scss';
import CategoryPreviewsPage from '../CategoryPreviewsPage/categories-page-component';
import CategoryPage from '../CategoryPage/cat-page-component';
import { useEffect } from 'react';
import { setCategoriesMap } from '../../store/categories/categories-action';
import { useDispatch } from 'react-redux';
import { getCollectionAndDocs } from '../../utils/firebase/firebase-utils';


const Shop = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    const fetchCategories = async () => {
    const categoryMap = await getCollectionAndDocs('products')
    dispatch(setCategoriesMap(categoryMap));
    }
    fetchCategories();
},[]);

  return (
    <Routes>
      <Route index element={<CategoryPreviewsPage />} />
      <Route path=':category' element={<CategoryPage />} />
    </Routes>
    )
}

export default Shop;
