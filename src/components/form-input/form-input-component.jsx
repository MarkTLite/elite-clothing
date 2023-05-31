import * as S from './form-input-styles'; //Styled Components

const FormInput = ({ label, ...otherProps }) => {
  return (
    <S.Group>
      <S.Input {...otherProps} />
      {label && (
        <S.FormInputLabel shrink={otherProps.value.length}>
          {label}
        </S.FormInputLabel>
      )}
    </S.Group>
  );
};

export default FormInput;
