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
            email: '',
            password: '',
            repeatPassword: '',
            errors: {}
        }
    }

    public async handleSubmit(event) {
        event.preventDefault();
        await this.handleValidation();

        if (Object.keys(this.state.errors).length) {
            return
        }

        const { email, password, repeatPassword } = this.state;
        const registerData: RegisterData = {
            email,
            password,
            repeatPassword,
        }

        try {
            const token = await this.authService.register(registerData)
            login({ token });
        } catch (error) {
            this.authentificationError = error[0];
            this.forceUpdate();
        }
    }

    public handleUsernameChange({ target: { value } }) {
        this.setState({
            email: value
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
        const { email, password, repeatPassword } = this.state;

        if (!email) {
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
        const { errors, email, password, repeatPassword } = this.state;
        return (
            <Layout>
                <div className="login-wrapper">
                    <div className='register'>
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <div className="input-group">
                                <label htmlFor='username'>Username</label>
                                <input
                                    type='text'
                                    id='username'
                                    name='username'
                                    value={email}
                                    onChange={(e) => this.handleUsernameChange(e)}
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
                            </div>

                            <div className="input-group">
                                <label htmlFor='repeatPassword'>Repeat your password</label>
                                <input
                                    type='password'
                                    id='repeatPassword'
                                    name='repeatPassword'
                                    value={repeatPassword}
                                    onChange={(e) => this.handlePasswordRepeatChange(e)}
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