import SignInForm from '../../components/sign-in-form/signin-component';
import SignUpForm from '../../components/sign-up-form/signup-form-component';
import './auth-styles.scss';

const Authentication = () => {
  return (
    <div className='authentication-container'>
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
