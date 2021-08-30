import _ from "lodash";
import * as yup from "yup";

export type FormValues = {
    name: string;
};

export const INITIAL_VALUES: FormValues = {
    name: "",
};

export const Validator = yup.object().shape({
    name: yup
        .string()
        .required("Organization name is required.")
        .nullable()
        .label("Organization"),
});
