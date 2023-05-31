import {Routes, Route} from 'react-router-dom';
import './shop-styles.scss';
import CategoryPreviewsPage from '../CategoryPreviewsPage/categories-page-component';
import CategoryPage from '../CategoryPage/cat-page-component';

const Shop = () => {

  return (
    <Routes>
      <Route index element={<CategoryPreviewsPage />} />
      <Route path=':category' element={<CategoryPage />} />
    </Routes>
    )
}

export default Shop;
