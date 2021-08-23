import _ from "lodash";
import * as yup from "yup";

export type FormValues = {
    name: string;
    email: string;
    password: string;
};

export const INITIAL_USER: FormValues = {
    name: "",
    email: "",
    password: "",
};

export const UserValidator = yup.object().shape({
    name: yup
        .string()
        .nullable()

        .test("Full name", "Full name is required.", (value: any): boolean => {
            const fullName = (value || "").trim();
            const nameParts = fullName.split(" ");
            return !_.isEmpty(fullName) && 2 <= nameParts.length;
        })
        .label("Full name"),
    email: yup
        .string()
        .email()
        .required("Email is required.")
        .nullable()
        .label("Email"),
    password: yup
        .string()
        .min(6)
        .nullable()
        .required("Password is required.")
        .label("Password"),
});
