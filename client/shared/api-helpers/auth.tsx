import fetch from 'isomorphic-unfetch';
import { environment } from '../../environments/environment'
import RegisterData from '../interfaces/register-user.interface';
import User from '../interfaces/user.interface';

export default class AuthService {
    public api = environment.api;

    public login(userData: User) {
        return new Promise(async (resolve, reject) => {
            const response = await fetch(`${this.api}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const { token } = await response.json()
                resolve(token);
            } else {
                const error = await response.json();
                reject(error);
            }
        })
    }

    public register(userData: RegisterData) {
        return new Promise(async (resolve, reject) => {
            console.log(userData);
            const response = await fetch(`${this.api}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            })

            if (response.ok) {
                const { token } = await response.json();
                resolve(token);
            } else {
                const error = await response.json();
                reject(error);
            }
        })
    }
}