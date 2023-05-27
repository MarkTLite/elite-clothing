import CategoryComponent from '../category-item/category-component';

const CategoryList = (props) => {
    const {categories} = props;
    return (
        <div className="categories-container">
            {
                categories.map((category) => {
                    return (
                        <CategoryComponent key={category.id} category={category} />
                    )
                })
            }
        </div>
    );
}

export default CategoryList;