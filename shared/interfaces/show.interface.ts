export default interface Show {
    id?: string,
    name: string,
    image: {
        medium: string,
        original: string,
    },
    summary: string,
}