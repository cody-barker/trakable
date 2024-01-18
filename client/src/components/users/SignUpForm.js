import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../state/usersSlice';

function SignUp() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const errors = useSelector((state) => state.users.errors);

  const errorComps = errors.map((error, index) => (
    <div key={index} className="error-container">
      {error.errors.map((errorMessage, i) => (
        <p key={i} className="errors">
          {errorMessage}
        </p>
      ))}
    </div>
  ));

  const [inputState, setInputState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    title: '',
  });

  const { 
    first_name,
    last_name,
    email,
    password,
    password_confirmation,
    title
    } = inputState;

  const onInputChange = (e) => {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(signupUser(inputState)).then(() => {
      setIsLoading(false);
    });
  };

  function renderInput(label, name, value) {
    return (
      <label key={name}>
        {label}
        <input
          name={name}
          type="text"
          autoComplete="off"
          value={value}
          onChange={onInputChange}
        />
      </label>
    );
  }

  return (
    <form className="flex-container flex-col flex-center" onSubmit={handleSubmit}>
      <h2>Welcome to Trakable</h2>
      <p>To begin, please sign up.</p>
      {renderInput('First Name', 'first_name', first_name)}
      {renderInput('Last Name', 'last_name', last_name)}
      {renderInput('Title', 'title', title)}
      {renderInput('Email', 'email', email)}
      {renderInput('Password', 'password', password, 'password')}
      {renderInput('Password Confirmation', 'password_confirmation', password_confirmation, 'password')}
      <button className="submit-btn " type="submit">
        {isLoading ? 'Loading...' : 'Sign Up'}
      </button>
      {errors.length > 0 && errorComps}
    </form>
  );
}

export default SignUp;