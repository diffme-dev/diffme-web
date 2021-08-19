export type FileSource =
    | "DROPBOX"
    | "GOOGLE_DRIVE"
    | "BOX"
    | "LOCAL"
    | "SHOPIFY";

export interface IFile {
    _id?: string;
    source: FileSource;
    type?: string;
    size?: number | null;
    name: string;
    description?: string | null;
    url: string;
    thumbnail?: string;

    createdAt?: Date;
    updatedAt?: Date;
}
