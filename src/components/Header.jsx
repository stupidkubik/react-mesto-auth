import { useContext } from 'react';
import logo from '../images/logo/logo-white.svg';
import { Link } from 'react-router-dom';
import LoginUserContext from '../contexts/LoginUserContext.js';

function Header({ name, link, handleExit }) {
  const { Paths } = useContext(LoginUserContext);

  return (
    <header className="header App__header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="Логотип" />
      </Link>
      {link ? (
        <Link className="header__link" to={link}>
          {name}
        </Link>
      ) : (
        <div>
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
      )}
    </header>
  );
}

export default Header;
