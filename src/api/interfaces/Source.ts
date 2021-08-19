export interface ISource {
    _id: string;
    shortId: string;
    company: {
        name: string;
        imageUrl?: string | null;
    };
}
