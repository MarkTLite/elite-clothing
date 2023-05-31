import { useNavigate } from 'react-router';
import * as S from './directory-item-styles';


const DirectoryComponent = (props) => {
    const { title, imageUrl, route } = props.category;
    const navigate = useNavigate();
    const toCategoryPage = () => navigate(`${route}`);
    return (
        <S.CategoryContainer onClick={toCategoryPage}>
            <S.BackgroundImage imageUrl={imageUrl} />
            <S.CategoryBodyContainer>
                <h2 className="category-name">{title.toUpperCase()}</h2>
                <p>Shop Now</p>
            </S.CategoryBodyContainer>
        </S.CategoryContainer>
    )

}

export default DirectoryComponent;