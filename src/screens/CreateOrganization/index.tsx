import { Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import Button from "src/components/styled/Button";
import { FormValues, INITIAL_VALUES, Validator } from "./form";

function CreateOrganization() {
    const onSubmit = async (
        values: FormValues,
        formikHelpers: FormikHelpers<FormValues>
    ) => {
        formikHelpers.setSubmitting(true);

        try {
            // TODO: add api call here
            // await Authentication.sendForgotPassword(values.email);

            formikHelpers.setStatus(
                "Success! Check your email to reset your password."
            );
        } catch (err) {
        } finally {
            formikHelpers.setSubmitting(false);
        }
    };

    const getInitialState = () => ({ ...INITIAL_VALUES });

    return (
        <Formik
            validationSchema={Validator}
            initialValues={getInitialState()}
            onSubmit={onSubmit}
            isInitialValid={false}
        >
            {(props) => {
                return (
                    <div className="min-h-screen bg-gray-50 flex flex-col justify-start py-12 sm:px-6 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-md">
                            {/* <Logo /> */}

                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Make your organization!
                            </h2>
                        </div>

                        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                                <form
                                    className="space-y-6"
                                    onSubmit={props.handleSubmit}
                                >
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Org Name
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="name"
                                                name="name"
                                                type="name"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                required
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <hr />

                                    <div>
                                        <Button
                                            type="submit"
                                            label="Create Organization"
                                            disabled={!props.isValid}
                                            onClick={props.handleSubmit}
                                            loading={props.isSubmitting}
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {props.status && (
                                        <h3 className="font-semibold text-green-500">
                                            {props.status}
                                        </h3>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
}

export default CreateOrganization;
