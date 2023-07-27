import { useEffect, useContext } from 'react';
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

  useEffect(() => {
    setValues({ email: '', password: '' });
  }, [setValues]);

  function handleSubmit(evt, values) {
    evt.preventDefault();
    onSubmit(values).then((res) => console.log(res)); //??????????
    // if res.statusCode  201
  }
  //if ok => close InfoTooltip => setValues
  //    navigate(Paths.Login);
  let image;
  let title;

  return (
    <>
      <Header name={'Войти'} link={Paths.Login} />

      <div className="App__signup">
        <h1 className="signup__title">Регистрация</h1>
        <form
          className={`signup__form`}
          name={`signup`}
          onSubmit={(evt) => handleSubmit(evt, values)}
          // noValidate
        >
          <Input
            id={'signup-email'}
            className={'signup__input signup__input_email'}
            type={'email'}
            name={'email'}
            placeholder={'Email'}
            spanId={'error-signup-email'}
            value={values.email}
            onChange={handleChange}
          />

          <Input
            id={'signup-password'}
            className={'signup__input signup__input_password'}
            type={'password'}
            name={'password'}
            placeholder={'Пароль'}
            minLength={'2'}
            maxLength={'20'}
            spanId={'error-signup-password'}
            value={values.password}
            onChange={handleChange}
          />
          <button className="signup__submit" type="submit">
            {isLoading ? '...' : 'Зарегистрироваться'}
          </button>
        </form>
        <div className="signin signup__signin">
          <p className="signin__title">
            Уже зарегистрированы?{' '}
            <Link className="signin__link" to={Paths.Login}>
              Войти
            </Link>
          </p>
        </div>
      </div>
      {isOpen ? (
        <InfoTooltip isOpen={isOpen} image={image} title={title} />
      ) : (
        ''
      )}
    </>
  );
}

export default Register;
