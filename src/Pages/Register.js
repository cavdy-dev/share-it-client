import React, { useState } from 'react';
import cookie from 'js-cookie';
import { Link } from 'react-router-dom';
import Input from '../components/Input/input';
import Button from '../components/Button/button';
import Title from '../utils/Title';
import {
  FormWrapper,
  FormSign,
  FormContainer,
  FormLogo,
  FormLogoWrapper,
  Footer
} from './authStyles';
import { axiosInstance } from '../services/config';
import { instagram2 } from '../assets/img';

const Register = () => {
  const [inputData, setInputData] = useState({});
  const [error, setError] = useState({});

  const handleChange = ({ target: { name, value } }) => {
    setInputData({ ...inputData, [name]: value });
  };

  const submitUser = async event => {
    event.preventDefault();
    try {
      const res = await axiosInstance.post('/auth/register', inputData);
      if (res && res.data) {
        const { token } = res.data;
        cookie.set('token', token);
      }

      const { origin } = window.location;
      window.location.replace(`${origin}/`);
    } catch (err) {
      if (err && err.response) {
        const { data } = err.response;
        if (data) {
          setError(data.data);
        }
      }
    }
  };

  return (
    <>
      <Title titleName="Register" />
      <FormSign>
        <FormContainer>
          <FormLogoWrapper>
            <FormLogo alt="Instagram" src={instagram2} />
          </FormLogoWrapper>
          <form onSubmit={submitUser}>
            <FormWrapper>
              <Input
                type="text"
                id="username"
                placeholder="Username"
                name="username"
                errorMsg={(error && error.username) || ''}
                handleChange={handleChange}
              />
              <Input
                type="email"
                id="inputEmail"
                placeholder="Email address"
                name="email"
                errorMsg={(error && error.email) || ''}
                handleChange={handleChange}
              />
              <Input
                type="password"
                id="inputPassword"
                name="password"
                placeholder="Password"
                errorMsg={(error && error.password) || ''}
                handleChange={handleChange}
              />
            </FormWrapper>
            <Button btnName="Sign up" />
          </form>
          <Footer>
            Already have an account?
            <Link to="/login">Log in</Link>
          </Footer>
        </FormContainer>
      </FormSign>
    </>
  );
};

export default Register;
