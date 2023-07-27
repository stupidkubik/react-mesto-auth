import { useContext, useEffect } from 'react';
import useForm from '../hooks/useForm.js';
import AppContext from '../contexts/AppContext.js';
import LoginUserContext from '../contexts/LoginUserContext.js';
import Header from './Header';
import Input from './Input';

function Login({ onSubmit }) {
  const { isLoading } = useContext(AppContext);
  const { Paths, userLogin } = useContext(LoginUserContext);

  const { values, handleChange, setValues } = useForm({
    email: '',
    password: '',
  });

  //resetform

  useEffect(() => {
    setValues({ email: userLogin?.email ?? '', password: '' });
  }, [setValues, userLogin]);

  return (
    <>
      <Header name={'Зарегистрироваться'} link={Paths.SignUp} />

      <div className="App__signup">
        <h1 className="signup__title">Вход</h1>
        <form
          className={`signup__form`}
          name={`signin`}
          onSubmit={(evt) => onSubmit(evt, values)}
          // noValidate
        >
          <Input
            id={'signin-email'}
            className={'signup__input signup__input_email'}
            type={'email'}
            name={'email'}
            placeholder={'Email'}
            spanId={'error-signin-email'}
            value={values.email}
            onChange={handleChange}
          />

          <Input
            id={'signin-password'}
            className={'signup__input signup__input_password'}
            type={'password'}
            name={'password'}
            placeholder={'Пароль'}
            minLength={'2'}
            maxLength={'20'}
            spanId={'error-signin-password'}
            value={values.password}
            onChange={handleChange}
          />
          <button className="signup__submit" type="submit">
            {isLoading ? '...' : 'Войти'}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
