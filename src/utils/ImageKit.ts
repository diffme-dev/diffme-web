const GOOGLE_BUCKET_ROOT =
    "https://storage.googleapis.com/content.greatoutdoors.io/";
const CDN_ROOT_URL = "https://content.greatoutdoors.io/";

const getCDNUrl = (
    url: string,
    { width, height }: { width?: number; height?: number }
): string | undefined => {
    if (!url) {
        return undefined;
    }

    const query = `?tr=${width ? "w-" + width : ""},${
        height ? "h-" + height : ""
    }`;

    if (url.includes(GOOGLE_BUCKET_ROOT)) {
        return `https://ik.imagekit.io/greatoutdoors/${url.replace(
            GOOGLE_BUCKET_ROOT,
            ""
        )}${query}`;
    }

    if (url.includes(CDN_ROOT_URL)) {
        return `https://ik.imagekit.io/greatoutdoors/${url.replace(
            CDN_ROOT_URL,
            ""
        )}${query}`;
    }

    return url;
};

export const ImageKit = {
    getCDNUrl,
};
