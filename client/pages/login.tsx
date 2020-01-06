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
      email: '',
      password: '',
      errors: {}
    }
  }

  public handleUserNameChange({ target: { value } }) {
    this.setState({
      email: value
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

    if (Object.keys(this.state.errors).length) {
      return;
    }
    
    const { email, password } = this.state;
    const userData: User = {
      email,
      password
    }

    try {
      const token = await this.authService.login(userData);
      login({ token });
    } catch (error) {
      this.authentificationError = error[0];
      this.forceUpdate();
    }
  }

  public async handleValidation() {
    const errors = {};
    const { email, password } = this.state;

    if (!email) {
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
    const { errors, email, password } = this.state;
    return (
      <Layout>
        <div className='login-wrapper'>
          <div className="login">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <div className="input-group">
                <label htmlFor='username'>Username</label>
                <input
                  type='text'
                  id='username'
                  name='username'
                  value={email}
                  onChange={(e) => this.handleUserNameChange(e)}
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
                  onChange={(e) => this.handlePasswordChange(e)}
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