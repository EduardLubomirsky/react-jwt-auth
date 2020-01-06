import fetch from 'isomorphic-unfetch';
import { environment } from '../../environments/environment';
import cookie from "js-cookie";

export default class TvMaze {
    static async getShows(): Promise<any[]> {
        return new Promise(async (resolve, reject) => {
            const res = await fetch(`${environment.api}/shows`);
            const data = await res.json();
            resolve(data);
        })
    }

    static async getById(id: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const token = cookie.get('token');            
            const res = await fetch(`${environment.api}/shows/${id}`, {
                headers: new Headers({
                    'authorization': token
                })
            });
            const show = await res.json();
            resolve(show);
        })
    }
}