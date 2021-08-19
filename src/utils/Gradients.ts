export const GRADIENTS = [
    ["#fc6767", "#ec008c"],
    ["#8E2DE2", "#4A00E0"],
    ["#56CCF2", "#2F80ED"],
    ["#f5af19", "#f12711"],
    ["#38ef7d", "#11998e"],
    ["#8E54E9", "#4776E6"],
    ["#0e1a22", "#000000"],
    ["#8f94fb", "#4e54c8"],
    ["#f80759", "#bc4e9c"],
    ["#ffe259", "#ffa751"],
    ["#fe8c00", "#f83600"],
    ["#A6FFCB", "#12D8FA"],
];

const hashFromString = (str: string): number => {
    if (!str) {
        return 0;
    }
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
};

const randomElement = (id: string) =>
    GRADIENTS[hashFromString(id) % GRADIENTS.length];

const randomLinearGradient = (id: string) => {
    const element = randomElement(id);
    const colors = element?.join(", ").trim();

    return `linear-gradient(180deg, ${colors})`;
};

export const Gradients = {
    randomLinearGradient,
};
