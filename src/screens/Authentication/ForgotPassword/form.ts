import _ from "lodash";
import * as yup from "yup";

export type FormValues = {
    email: string;
};

export const INITIAL_USER: FormValues = {
    email: "",
};

export const UserValidator = yup.object().shape({
    email: yup
        .string()
        .email()
        .required("Email is required.")
        .nullable()
        .label("Email"),
});
