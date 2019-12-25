import { Component } from 'react';
import Layout from '../components/Layout';
import { login } from '../utils/auth';
import AuthService from '../shared/api-helpers/auth';
import User from '../shared/interfaces/user.interface';
import Link from 'next/link';
import LoginState from '../shared/interfaces/login.interface';

class Login extends Component<{}, LoginState> {
  public authService = new AuthService();
  public authentificationError: string = '';

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      errors: {}
    }
    this.handleUserNameChange = this.handleUserNameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  public handleUserNameChange({ target: { value } }) {
    this.setState({
      username: value
    });
  }

  public handlePasswordChange({ target: { value } }) {
    this.setState({
      password: value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.handleValidation();

    // If form is valid
    if (!Object.keys(this.state.errors).length) {
      const { username, password } = this.state;

      const userData: User = {
        username,
        password
      }

      try {
        this.authService.login(userData).then((token) => {
          login({ token });
        }, err => {
          this.authentificationError = err.message;
          this.forceUpdate();
        });
      } catch (error) {
        console.error(
          'You have an error in your code or there are Network issues.',
          error
        )
        throw new Error(error)
      }
    }
  }

  public async handleValidation() {
    const errors = {};
    const { username, password } = this.state;

    if (!username) {
      errors['username'] = 'User name is required!';
    }

    if (password.length < 6) {
      errors['password'] = 'Password should be in least 6 charsets!';
    }

    if (!password) {
      errors['password'] = 'Password is required!';
    }

    await this.setState({
      errors
    })
  }

  render() {
    const { errors, username, password } = this.state;
    return (
      <Layout>
        <div className='login-wrapper'>
          <div className="login">
            <form onSubmit={this.handleSubmit}>
              <div className="input-group">
                <label htmlFor='username'>Username</label>
                <input
                  type='text'
                  id='username'
                  name='username'
                  value={username}
                  onChange={this.handleUserNameChange}
                />
                <span>{errors['username']}</span>
              </div>
              <div className="input-group">
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  value={password}
                  onChange={this.handlePasswordChange}
                />
                <span>{errors['password']}</span>
                {this.authentificationError ? <span>{this.authentificationError}</span> : null}
              </div>
              <div className="btn-group">
                <Link href="/register">
                  <a className="btn" href="/register">Register</a>
                </Link>
                <button type='submit' className="btn">Login</button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Login