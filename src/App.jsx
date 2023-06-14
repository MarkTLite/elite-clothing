import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./routes/Home/home-component";
import Navigation from "./routes/NavBar/navigation-component";
import Shop from "./routes/Shop/shop-component";
import Authentication from "./routes/Authentication/auth-component";
import CheckoutPage from "./routes/Checkout/checkout-component";
import { checkUserSession, setCurrentUser } from "./store/user/user-actions";
import {
  getCurrentUser,
} from "./utils/firebase/firebase-utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //note that the unsubscribe gets called
    dispatch(checkUserSession());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
