import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';



const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null);



  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;


  const redirect = location.search ? location.search.split('=')[1] : '/';

  // Check for userInfo if exists
  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }


  }, [navigate, userInfo, redirect])


  const submitHandler = (e) => {
    e.preventDefault();

    // Passwords have to match
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      //  dispatch register
      dispatch(register(name, email, password))
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && (<Message variant='danger'>{message}</Message>)}
      {error && (<Message variant='danger'>{error}</Message>)}
      {loading && (<Loader />)}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Enter Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controld='password'>
          <Form.Label>Enter Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controld='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button style={{ marginTop: '1rem' }} type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen