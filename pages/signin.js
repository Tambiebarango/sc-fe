import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { Button, TextField, Typography } from "@material-ui/core";
import Container from '../components/UI/container/container';
import { Box } from '@mui/system';
import { Alert } from '@mui/material';
import { useAppContext } from '../lib/context';
import { useCookies } from 'react-cookie';
import { CheckLoggedIn } from '../lib/checkLoggedIn';

export async function getServerSideProps(context){
  const token = context.req.cookies.token

  const result = await CheckLoggedIn(token)

  if(result.loggedIn === true){
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props:{ user: result.data},
    };
  }else {
    return { props: {} }
  }
}

export default function Signin() {
  const {setUser} = useAppContext();
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'user']);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const signInUser = async (email, password) => {
    const settings = {
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: email,
          password: password
        }
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    try {
      const fetchResponse = await fetch(`http://localhost:5000/users/sign_in`, settings);
      const data = await fetchResponse.json();
      const jwt = await fetchResponse.headers.get('Authorization')
      if(!data.error){

        localStorage.setItem("token", jwt)
        localStorage.setItem("username", data.username)

        setUser(data.username)
        setCookie('token', jwt)
        setCookie('user', data.username)
        router.push('/')
      } else {
        setError(data.error)
      }
    } catch (e) {
      setError(e);
    }
  }
  const handleSubmit = (e, email, password) => {
    e.preventDefault()

    signInUser(email, password)
  }

  return(
    <Container>
      {
        error && 
        <Alert severity="error">{error}</Alert>
      }
      <h3>Sign In</h3>
      <form onSubmit={ e => handleSubmit(e, email, password) }>
        <Box>
          <TextField
            fullWidth
            id="outlined-email"
            label="Email"
            type='email'
            value={email}
            variant='outlined'
            margin="normal"
            onChange={ e => setEmail(e.target.value) }
          />
          <TextField
            fullWidth
            id="outlined-password"
            label="Password"
            type='password'
            value={password}
            variant='outlined'
            margin="normal"
            onChange={ e => setPassword(e.target.value) }
          />
          <Button type="submit" color="primary" variant="contained">Submit</Button>
          <br/>
          <br/>
          <br/>
          <Typography variant="p" textAlign="center">Don't have an account? <a href="/signup">Sign up</a></Typography>
        </Box>
      </form>
    </Container>
  )
}