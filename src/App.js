import { useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const inputHandler = (type, value) => {
    if (type === 'name') {
      if (value) {
        setUser({ ...user, name: value });
        setError('');
      }
    }
    if (type === 'email') {
      if (value) {
        const isEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
          value
        );
        if (isEmail) {
          setUser({ ...user, email: value });
          setError('');
        } else {
          setError('Invalid email');
        }
      }
    }
    if (type === 'password') {
      if (value) {
        const isPass =
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value);
        if (isPass) {
          setUser({ ...user, password: value });
          setError('');
        } else {
          setError(
            'Password at least have 8 characters including a upper case letter,a lower case letter, a number and a special character'
          );
        }
      }
    }
  };

  const clearForm = () => {
    const form = document.getElementById('signupForm');
    form.reset();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!error) {
      if (user.name !== '' && user.email !== '' && user.password !== '') {
        setSuccess('Signup successful');
        setUser({
          name: '',
          email: '',
          password: '',
        });
        clearForm();
      } else {
        setError('Signup failed! Please try again');
      }
    }
  };

  return (
    <div className='App'>
      <div id='formWrapper'>
        <h2>User Signup Form</h2>
        <div id='message'>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
        <form id='signupForm'>
          <label>Name</label>
          <input
            type='text'
            placeholder='Input Name'
            onBlur={(e) => inputHandler('name', e.target.value)}
          />
          <label>Email</label>
          <input
            type='text'
            placeholder='Input Email'
            onBlur={(e) => inputHandler('email', e.target.value)}
          />
          <label>Password</label>
          <input
            type='password'
            placeholder='Input Password'
            onBlur={(e) => inputHandler('password', e.target.value)}
          />
          <button type='submit' onClick={(e) => submitHandler(e)}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
