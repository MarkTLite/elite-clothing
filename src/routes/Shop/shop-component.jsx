import {Routes, Route} from 'react-router-dom';
import './shop-styles.scss';
import CategoriesPreviewPage from '../CategoriesPage/categories-page-component';
import CategoryPage from '../CategoryPage/cat-page-component';

const Shop = () => {

  return (
    <Routes>
      <Route index element={<CategoriesPreviewPage />} />
      <Route path=':category' element={<CategoryPage />} />
    </Routes>
    )
}

export default Shop;
