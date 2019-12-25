import Show from "../interfaces/show.interface";

export default class TvMaze {
    static async getShows(): Promise<any[]> {
        return new Promise(async (resolve, reject) => {
            const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
            const data = await res.json();
            resolve(data);
        })
    }
}