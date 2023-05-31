import { Outlet } from "react-router-dom";

import CategoryList from "../../components/directory-list/directory-list-component";

const Home = () => {

  return (
    <div>
      <CategoryList/>
      <Outlet />
    </div>
  )
}

export default Home;