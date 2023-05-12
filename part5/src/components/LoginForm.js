const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return(
    <form onSubmit={handleSubmit}>
      <div>
            username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
          id="username"
        />
      </div>
      <div>
            password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
          id="password"
        />
      </div>
      <button type="submit" id="login-button">login</button>
    </form>
  )
}

export default LoginForm