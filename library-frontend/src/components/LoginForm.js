import { useState, useEffect } from "react";
import { useMutation } from '@apollo/client'
import { LOGIN } from "./queries"
const LoginForm = ({setToken, setError, show}) => {
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');
    const [Login, result] = useMutation(LOGIN, {
      onError: (error) => {
        setError(error.graphQLErrors[0].message)
      }
    })
    useEffect(() => {
      if ( result.data ) {
        console.log(result.data)
        setToken(result.data.login.value)
        localStorage.setItem('userToken', result.data.login.value)
      }
    }, [result.data]) // eslint-disable-line

    if (!show) {
      return null
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log( username, password)
        Login({ variables: { username, password } })
    }

    return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
          username: <input type='text' onChange={({target})=> setName(target.value)} />
          password: <input type='password' onChange={({target})=> setPassword(target.value)} />
          <button type="submit">login</button>
      </form>
    </div>
  )
}
export default LoginForm