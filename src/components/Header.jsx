import { useContext, useState } from 'react';
import logo from '../images/logo/logo-white.svg';
import { Link } from 'react-router-dom';
import LoginUserContext from '../contexts/LoginUserContext.js';

function Header({ name, link, handleExit }) {
  const { Paths } = useContext(LoginUserContext);
  const [mobileWiev, useMobileWiev] = useState(true);

  function toggleMenu() {
    console.log('click');
  }

  return (
    <header
      className="header App__header"
      // className={`${
      //   mobileWiev ? 'App__header_type_menu' : 'App__header'
      // } header`}
    >
      <Link to="/">
        <img className="header__logo" src={logo} alt="Логотип" />
      </Link>
      {link ? (
        <Link className="header__link" to={link}>
          {name}
        </Link>
      ) : !mobileWiev ? (
        <div className={mobileWiev ? 'header__menu_type_hidden' : ''}>
          <div className="header__email">{name}</div>
          <Link
            className="header__exit"
            type="button"
            onClick={handleExit}
            to={Paths.Login}
          >
            Выйти
          </Link>
        </div>
      ) : (
        <button
          className="header__menu"
          type="button"
          onClick={toggleMenu}
        ></button>
      )}
    </header>
  );
}

export default Header;
