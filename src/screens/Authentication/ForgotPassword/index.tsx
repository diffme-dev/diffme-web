import { Formik } from "formik";
import { Link } from "react-router-dom";
import Button from "src/components/styled/Button";
import { INITIAL_USER } from "./form";

function ForgotPassword() {
    const onSubmit = () => {
        // TODO:
        alert("on submit");
    };

    const getInitialState = () => ({ ...INITIAL_USER });

    return (
        <Formik initialValues={getInitialState()} onSubmit={onSubmit}>
            {(props) => {
                return (
                    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-md">
                            {/* <Logo /> */}

                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Forgot your password
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
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Email address
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                autoComplete="email"
                                                required
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="text-sm">
                                            <Link
                                                to="/login"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Have an account? Login.
                                            </Link>
                                        </div>
                                    </div>

                                    <div>
                                        <Button
                                            type="submit"
                                            label="Send Reset Password Email"
                                            onClick={props.handleSubmit}
                                            loading={props.isSubmitting}
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
}

export default ForgotPassword;
