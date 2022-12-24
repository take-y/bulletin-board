import Header from "./Common/Header";
import Footer from "./Common/Footer";
import { Outlet } from "react-router-dom";
const BulletinBoard = ({title}) => (
  <>
    <Header title={title} />
    <main className="app-main">
      <Outlet />
    </main>
    <Footer />    
  </>
);

export default BulletinBoard;