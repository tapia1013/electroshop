import axios from 'axios';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,

} from "../constants/userConstants"


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
      loading: true
    })

    // We need to send config type when getting data through headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    // post(3 args) ('/',{email,pw}, config)
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    // set to lcoalstorage
    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    })
  }
}