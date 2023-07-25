import logo from '../images/logo/logo-white.svg';

function Header({ name, link }) {
  return (
    <header className="header App__header">
      <img className="header__logo" src={logo} alt="Логотип" />
      {name ? (
        <a className="header__link" href={link}>
          {name}
        </a>
      ) : (
        ''
      )}
    </header>
  );
}

export default Header;
