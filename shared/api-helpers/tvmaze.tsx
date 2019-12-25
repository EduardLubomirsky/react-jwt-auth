import fetch from 'isomorphic-unfetch';

export default class TvMaze {
    static async getShows(): Promise<any[]> {
        return new Promise(async (resolve, reject) => {
            const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
            const data = await res.json();
            resolve(data);
        })
    }

    static async getById(id: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
            const show = await res.json();
            resolve(show);
        })
    }
}