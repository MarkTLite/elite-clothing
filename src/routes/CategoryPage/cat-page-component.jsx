import { useParams } from 'react-router-dom';
import './cat-page-styles.scss'
import ProductCard from '../../components/product-card/product-card-component';
import { Fragment, useContext, useEffect, useState } from 'react';
import { CategoriesContext } from '../../contexts/categories-context';

const CategoryPage = () => {
    const {category} = useParams();
    const {categories} = useContext(CategoriesContext);
    const [products, setProducts] = useState(categories[category]);

    useEffect(()=>{
        setProducts(categories[category])
    }, [category, categories])

    return(
        <Fragment>
        <h2 className='category-title'>{category.toUpperCase()}</h2>
        <div className='category-container2'>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </Fragment> 
    )
}

export default CategoryPage;