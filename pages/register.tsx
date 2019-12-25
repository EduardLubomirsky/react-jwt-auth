import { Component } from 'react';
import AuthService from '../shared/api-helpers/auth';
import Layout from '../components/Layout';
import RegisterData from '../shared/interfaces/register-user.interface';
import { login } from '../utils/auth';
import Link from 'next/link';
import RegisterState from '../shared/interfaces/register.interface';

class Register extends Component<{}, RegisterState> {
    public authService = new AuthService();
    public authentificationError: string = '';

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            repeatPassword: '',
            errors: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordRepeatChange = this.handlePasswordRepeatChange.bind(this);
    }

    public async handleSubmit(event) {
        event.preventDefault();
        await this.handleValidation();

        // If form is valid
        if (!Object.keys(this.state.errors).length) {
            const { username, password, repeatPassword } = this.state;
            const registerData: RegisterData = {
                username,
                password,
                repeatPassword,
            }
            try {
                this.authService.register(registerData).then((token) => {
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

    public handleUsernameChange({ target: { value } }) {
        this.setState({
            username: value
        })
    }

    public handlePasswordChange({ target: { value } }) {
        this.setState({
            password: value
        })
    }

    public handlePasswordRepeatChange({ target: { value } }) {
        this.setState({
            repeatPassword: value
        })
    }

    public async handleValidation() {
        const errors = {};
        const { username, password, repeatPassword } = this.state;

        if (!username) {
            errors['username'] = 'User name is required!';
        }

        if (password.length < 6) {
            errors['password'] = 'Password should be in least 6 charsets!';
        }

        if (!password) {
            errors['password'] = 'Password is required!';
        }

        if (repeatPassword !== password) {
            errors['repeatPassword'] = 'Passwords did not match!';
        }

        if (!repeatPassword) {
            errors['repeatPassword'] = 'Please repeat your password!';
        }

        await this.setState({
            errors
        })
    }

    render() {
        const { errors, username, password, repeatPassword } = this.state;
        return (
            <Layout>
                <div className="login-wrapper">
                    <div className='register'>
                        <form onSubmit={this.handleSubmit}>
                            <div className="input-group">
                                <label htmlFor='username'>Username</label>
                                <input
                                    type='text'
                                    id='username'
                                    name='username'
                                    value={username}
                                    onChange={this.handleUsernameChange}
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
                            </div>

                            <div className="input-group">
                                <label htmlFor='repeatPassword'>Repeat your password</label>
                                <input
                                    type='password'
                                    id='repeatPassword'
                                    name='repeatPassword'
                                    value={repeatPassword}
                                    onChange={this.handlePasswordRepeatChange}
                                />
                                <span>{errors['repeatPassword']}</span>
                                {this.authentificationError ? <span>{this.authentificationError}</span> : null}
                            </div>

                            <div className="btn-group">
                                <Link href="/login">
                                    <a className="btn" href="/login">Login</a>
                                </Link>
                                <button className="btn" type='submit'>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Register;