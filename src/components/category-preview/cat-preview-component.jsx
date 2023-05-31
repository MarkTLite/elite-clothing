import './cat-styles.scss'
import ProductCard from '../product-card/product-card-component';
import Button from '../button/button-component';
import { useNavigate } from 'react-router';

const CategoryPreview = ({ title, products }) => {
    const navigate = useNavigate()

    const seeMoreHandler = () => navigate(`${title}`);
    
    return (
        <div className='category-preview-container'>
            <h2>
                <span className='title'>{title.toUpperCase()}</span>
            </h2>
            <div className='preview'>
                {products
                    .filter((_, idx) => idx < 4)
                    .map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </div>
            <div className='see-more'>
            <Button buttonType={'inverted'} onClick={seeMoreHandler}>See More</Button>
            </div>
            
        </div>
    );
}

export default CategoryPreview;