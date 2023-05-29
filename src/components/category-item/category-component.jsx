import './category-styles.scss';

const CategoryComponent = (props) => {
    const { title, imageUrl } = props.category;
    return (
        <div className="category-container">
            <div className="background-image" style={{
                background: `url(${imageUrl})`
            }} />
            <div className='category-body-container'>
                <h3 className="category-name">{title}</h3>
                <p>Shop Now</p>
            </div>
        </div>
    )

}

export default CategoryComponent;