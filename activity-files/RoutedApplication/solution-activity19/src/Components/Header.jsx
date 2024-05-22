import { Link, NavLink } from 'react-router-dom';
import logo from './images/logo.svg';

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <a href="https://www.digitalfutures.com" className="navbar-brand" target="_blank" rel="noreferrer">
          <img src={logo} alt="Digital Futures" width="100" />
        </a>
        <Link to="/" className="navbar-brand link-light">Todo App</Link>
        <div id="navbarToggle" className="collapse navbar-collapse">
            <div className="navbar-nav navbar-light">
              <NavLink to="/" className={({isActive}) => isActive ? `nav-link active` : `nav-link`}>Todos</NavLink>
              <NavLink to="/add" className={({ isActive }) => isActive ? `nav-link active` : `nav-link`}>Add Todo</NavLink>  
            </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;