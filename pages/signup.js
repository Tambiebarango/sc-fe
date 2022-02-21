import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { Button, TextField, Typography } from "@material-ui/core";
import Container from '../components/UI/container/container';
import { Box } from '@mui/system';
import { Alert } from '@mui/material';
import { useAppContext } from '../lib/context';
import { CheckLoggedIn } from '../lib/checkLoggedIn';
import { useCookies } from 'react-cookie';

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

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'user']);
  const { setUser } = useAppContext()

  const signUpUser = async (email, password, passwordConfirmation, username) => {
    const settings = {
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: username,
          email: email,
          password: password,
          passwordConfirmation: passwordConfirmation
        }
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    try {
      const fetchResponse = await fetch(`http://localhost:5000/users`, settings);
      const data = await fetchResponse.json();
      const jwt = await fetchResponse.headers.get('Authorization')
      console.log(data)
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
  const handleSubmit = (e, email, password, passwordConfirmation, username) => {
    e.preventDefault()

    signUpUser(email, password, passwordConfirmation, username)
  }

  return(
    <Container>
      {
        error && 
        <Alert severity="error">{error}</Alert>
      }
      <h3>Sign Up</h3>
      <form onSubmit={ e => handleSubmit(e, email, password, passwordConfirmation, username) }>
        <Box>
          <TextField
            fullWidth
            id="outlined-username"
            label="Username"
            type='text'
            value={username}
            variant='outlined'
            margin="normal"
            onChange={ e => setUsername(e.target.value) }
          />
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
          <TextField
            fullWidth
            id="outlined-password-confirm"
            label="Password Confirmation"
            type='password'
            value={passwordConfirmation}
            variant='outlined'
            margin="normal"
            onChange={ e => setPasswordConfirmation(e.target.value) }
          />
          <Button type="submit" color="primary" variant="contained">Submit</Button>
          <br/>
          <br/>
          <br/>
          <Typography textAlign="center">Already have an account? <a href="/signin">Sign in</a></Typography>
        </Box>
      </form>
    </Container>
  )
}