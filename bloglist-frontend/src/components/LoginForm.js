import styles from './Styles'
import PropTypes from 'prop-types'

const LoginForm = ({ msg, onSubmit, userChange, passwordChange }) => (
  <>
    <h1>Log in to application</h1>
    {msg !== null? <div style={styles.error}>{msg}</div> : <></>}
    <form onSubmit={onSubmit}>
      <div>
       username
        <input
          type="text"
          /*   value={username}   */
          id="username"
          onChange={({ target }) => userChange(target.value)}
        />
      </div>
      <div>
       password
        <input
          type="password"
          /*    value={password}   */
          id="password"
          onChange={({ target }) => passwordChange(target.value)}
        />
      </div>
      <button type="submit" id="login-btn">login</button>
    </form>
  </>
)
LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  userChange: PropTypes.func.isRequired,
  passwordChange: PropTypes.func.isRequired,
  msg: PropTypes.string
}

export default LoginForm