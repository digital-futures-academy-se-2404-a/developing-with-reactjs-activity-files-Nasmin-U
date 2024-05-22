import { useRef } from 'react';
import { Collapse } from 'bootstrap';
import { Link, NavLink } from 'react-router-dom';
import logo from './images/logo.svg';

const Header = () => {
  const collapseMenu = useRef();

  const toggleCollapse = () => {
    const collapseEle = collapseMenu.current;
    const bsCollapse = Collapse.getInstance(collapseEle) ?? new Collapse(collapseEle);
    bsCollapse.toggle();
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <a href="https://www.digitalfutures.com" className="navbar-brand" target="_blank" rel="noreferrer">
          <img src={logo} alt="Digital Futures" width="100" />
        </a>
        <Link to="/" className="navbar-brand link-light">Todo App</Link>
        <button className="navbar-toggler" type="button" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleCollapse}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="navbarToggle" className="collapse navbar-collapse" ref={collapseMenu} data-testid="collapseMenu">
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