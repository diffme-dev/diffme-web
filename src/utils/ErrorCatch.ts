import { message } from "antd";
import { prop } from "lodash/fp";

export const toastError = (err: any): string => {
    const errorMessage = prop("response.data.message", err);
    const parsedError = errorMessage || err.message;

    message.error(parsedError);

    return parsedError;
};
