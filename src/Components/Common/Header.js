import { Link, Outlet } from "react-router-dom";
const Header = ({title}) => (
  
    <header className="app-header">
      <h1 className='app-title'><Link to="/">{title}</Link></h1>
      <div className="create-thread"><Link to="/thread/new">スレッドを立てる</Link></div>      
    </header>
    
  
);

export default Header;