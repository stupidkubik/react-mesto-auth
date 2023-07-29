import { useContext, useEffect, useState } from 'react';
import logo from '../images/logo/logo-white.svg';
import { Link } from 'react-router-dom';
import LoginUserContext from '../contexts/LoginUserContext.js';

function Header({ name, link, handleExit }) {
  const { Paths } = useContext(LoginUserContext);
  const [mobileWiev, setMobileWiev] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  // Функция открытия бургер-меню
  function toggleMenu() {
    document.querySelector('header').classList.toggle('header_opened');
    setMenuIsOpen(!menuIsOpen);
  }

  // Определяем размер экрана и меняем бругер-меню
  useEffect(() => {
    function changeWiev() {
      const screenWidth = window.innerWidth;

      if (screenWidth < 767) {
        setMobileWiev(true);
      } else setMobileWiev(false);
    }

    window.addEventListener('resize', changeWiev);

    return () => {
      window.removeEventListener('resize', changeWiev);
    };
  }, [mobileWiev]); //баг при первой загрузке

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
        <>
          <div className={mobileWiev ? 'header__menu_hidden' : 'header__menu'}>
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

          <button
            className={
              mobileWiev
                ? `${
                    menuIsOpen
                      ? 'header__burger-menu_opened'
                      : 'header__burger-menu'
                  }`
                : 'header__burger-menu_hidden'
            }
            type="button"
            onClick={toggleMenu}
          />
        </>
      )}
    </header>
  );
}

export default Header;
