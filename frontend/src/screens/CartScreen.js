import React, { useEffect, useState } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart } from '../actions/cartActions';


const CartScreen = () => {
  let params = useParams();
  let location = useLocation();
  let navigate = useNavigate();

  const productId = params.id

  // we only want the num thats after the = sign
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  // console.log(qty);


  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  console.log(cartItems);


  useEffect(() => {
    // Only dispatch if theres an ID
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])


  return (
    <div>CartScreen</div>
  )
}

export default CartScreen