import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm.js';
import AppContext from '../contexts/AppContext.js';
import LoginUserContext from '../contexts/LoginUserContext';
import Header from './Header';
import Input from './Input';
import InfoTooltip from './InfoTooltip.jsx';

function Register({ onSubmit, isOpen }) {
  const { isLoading } = useContext(AppContext);
  const { Paths } = useContext(LoginUserContext);

  const { values, handleChange, setValues } = useForm({
    email: '',
    password: '',
  });

  //Стейт наполнения тултипа
  const [tooltipInfo, setTooltipInfo] = useState({
    popupTitle: '',
    cssClass: '',
  });

  async function handleSubmit(evt, values) {
    evt.preventDefault();
    const resp = await onSubmit(values);

    // Логика тултипа
    if (resp.data) {
      setTooltipInfo({
        popupTitle: 'Вы успешно зарегистрировались!',
        cssClass: 'popup__info-success',
      });
      setValues({ email: '', password: '' });
    } else {
      setTooltipInfo({
        popupTitle: 'Что-то пошло не так! Попробуйте ещё раз.',
        cssClass: 'popup__info-fail',
      });
    }
  }

  return (
    <>
      <Header name={'Войти'} link={Paths.Login} />

      <div className="login App__login">
        <h1 className="login__title">Регистрация</h1>
        <form
          className={`login__form`}
          name={`signup`}
          onSubmit={(evt) => handleSubmit(evt, values)}
          // noValidate
        >
          <Input
            id={'signup-email'}
            className={'login__input login__input_email'}
            type={'email'}
            name={'email'}
            placeholder={'Email'}
            spanId={'error-signup-email'}
            value={values.email}
            onChange={handleChange}
          />

          <Input
            id={'signup-password'}
            className={'login__input login__input_password'}
            type={'password'}
            name={'password'}
            placeholder={'Пароль'}
            minLength={'2'}
            maxLength={'20'}
            spanId={'error-signup-password'}
            value={values.password}
            onChange={handleChange}
          />

          <button className="login__submit" type="submit">
            {isLoading ? '...' : 'Зарегистрироваться'}
          </button>
        </form>

        <div className="login__signin">
          <p className="login__subtitle">
            Уже зарегистрированы?{' '}
            <Link className="login__link" to={Paths.Login}>
              Войти
            </Link>
          </p>
        </div>
      </div>

      {isOpen ? (
        <InfoTooltip
          isOpen={isOpen}
          popupTitle={tooltipInfo.popupTitle}
          cssClass={tooltipInfo.cssClass}
        />
      ) : (
        ''
      )}
    </>
  );
}

export default Register;
