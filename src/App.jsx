import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './routes/Home/home-component'
import Navigation from './routes/NavBar/navigation-component';
import Shop from './routes/Shop/shop-component';
import Authentication from './routes/Authentication/auth-component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home/>} />
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
      </Route>
    </Routes>
  )
}

export default App;
