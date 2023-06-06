import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './routes/Home/home-component'
import Navigation from './routes/NavBar/navigation-component';
import Shop from './routes/Shop/shop-component';
import Authentication from './routes/Authentication/auth-component';
import CheckoutPage from './routes/Checkout/checkout-component';
import { setCurrentUser } from './store/user/user-actions';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from './utils/firebase/firebase-utils';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    // onAuthStateChanged(auth, callback) receives this callback, provides user parameter, returns a function. 
    // So the unsubscribe gets called
    const unsubscribe =  onAuthStateChangedListener((user) => {
        if(user){
           createUserDocumentFromAuth(user);
        }
        dispatch(setCurrentUser(user));
        console.log(user);
    });
    return unsubscribe;
},[dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home/>} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='checkout' element={<CheckoutPage />} />
        <Route path='auth' element={<Authentication />} />
      </Route>
    </Routes>
  )
}

export default App;
