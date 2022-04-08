import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';


const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null);



  // let location = useLocation();
  // const navigate = useNavigate();

  const dispatch = useDispatch();


  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails
  // console.log(userDetails);

  // Get userLogin to see if user is already logged in if not we dont want them to see this update page
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin


  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile



  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        // console.log(user.name);
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      // DISPATCH UPDATE PROFILE
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return (<Row>
    <Col md={3}>
      <h2>User Profile</h2>
      {message && (<Message variant='danger'>{message}</Message>)}
      {error && (<Message variant='danger'>{error}</Message>)}
      {success && (<Message variant='success'>Profile Updated</Message>)}
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
          Update
        </Button>
      </Form>
    </Col>

    <Col md={9}>
      <h2>My Orders</h2>
    </Col>
  </Row>
  )
}

export default ProfileScreen