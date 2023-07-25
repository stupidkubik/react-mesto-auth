import React from 'react';
import Input from './Input';
import useForm from '../hooks/useForm.js';
import AppContext from '../contexts/AppContext.js';
import Header from './Header';

function Login({ onSubmit, isOpen }) {
  const { values, handleChange, setValues } = useForm({
    signup: '',
    password: '',
  });

  React.useEffect(() => {
    setValues({ signup: '', password: '' });
  }, [isOpen, setValues]);

  const { isLoading } = React.useContext(AppContext);

  return (
    <>
      <Header name={'Зарегистрироваться'} link={'/sign-up'} />

      <div className="App__signup">
        <h1 className="signup__title">Вход</h1>
        <form
          className={`signup__form`}
          name={`signup`}
          onSubmit={onSubmit}
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
            {isLoading ? '...' : 'Войти'}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
