import logo from '../../assets/images/logo_star_wars.png';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <div>
      <header className={classes.header}>
        <NavLink to="/" >
         <img src={logo} className={classes.logo} alt="logo" />
       </NavLink>
      </header>
    </div>
  );
}

export default Header;