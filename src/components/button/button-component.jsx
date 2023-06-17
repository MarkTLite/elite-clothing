import * as S from "./button-styles"; //Styled Components

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
  return {
    base: S.BaseButton,
    google: S.GoogleSignInButton,
    inverted: S.InvertedButton,
  }[buttonType];
};

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? <S.ButtonSpinner /> : children}
    </CustomButton>
  );
};

export default Button;
