import { Formik } from "formik";
import { compose, getOr } from "lodash/fp";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Button from "src/components/styled/Button";
import { setUserLoggedIn } from "src/redux/reducers/user";
import { Firebase } from "src/utils";
import Authentication, { getLoginErrorMessage } from "src/utils/Authentication";
import { INITIAL_USER, FormValues, UserValidator } from "./form";
import * as yup from "yup";
import { Github, Google } from "src/components/Authentication";

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const _setLoggedIn = compose(dispatch, setUserLoggedIn);

    const _checkEmail = async ({ email }: FormValues) => {
        const isEmail = await yup.string().email().validate(email.trim());

        if (!isEmail) {
            alert("Please add a valid email!");
            return;
        }

        const methods = await Firebase.auth().fetchSignInMethodsForEmail(email);

        if (!methods.includes("password")) {
            setError(getLoginErrorMessage(methods));
        } else {
            setShowPassword(true);
        }
    };

    const _login = async ({ email, password }: FormValues) => {
        setError(null);

        try {
            const response = await Authentication.loginWithEmail(
                email.toLowerCase().trim(),
                password
            );

            if (response.isFailure()) {
                throw response.error;
            }

            _setLoggedIn(true);

            history.push("/changes");
        } catch (err) {
            setError(getOr("Could not login", "message", err));
        }
    };

    const onSubmit = async (values: FormValues) => {
        if (showPassword) {
            await _login(values);
        } else {
            await _checkEmail(values);
        }
    };

    const getInitialState = () => ({ ...INITIAL_USER });

    return (
        <Formik initialValues={getInitialState()} onSubmit={onSubmit}>
            {(props) => {
                const values = props.values;
                console.log(values);

                return (
                    <div className="min-h-screen bg-gray-100 flex flex-col justify-start py-12 sm:px-6 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-md">
                            {/* <Logo className="text-3xl" /> */}
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Sign in to your account
                            </h2>

                            {/* <p className="mt-2 text-center text-sm text-gray-600">
                    Or{" "}
                    <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        start your 14-day free trial
                    </a>
                </p> */}
                        </div>

                        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                                <form
                                    className="space-y-6"
                                    action="#"
                                    method="POST"
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
                                                autoComplete="email"
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                required
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    {showPassword && (
                                        <div>
                                            <label
                                                htmlFor="password"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Password
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    autoComplete="current-password"
                                                    onChange={
                                                        props.handleChange
                                                    }
                                                    onBlur={props.handleBlur}
                                                    required
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between">
                                        <div className="text-sm">
                                            <Link
                                                to="/forgot-password"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>

                                        <div className="text-sm">
                                            <Link
                                                to="/sign-up"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Need an account? Sign up
                                            </Link>
                                        </div>
                                    </div>

                                    <div>
                                        <Button
                                            label={
                                                showPassword
                                                    ? "Sign in"
                                                    : "Continue with email"
                                            }
                                            type="submit"
                                            onClick={props.handleSubmit}
                                            loading={props.isSubmitting}
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    {error && (
                                        <h3 className="font-semibold text-red-500">
                                            {error}
                                        </h3>
                                    )}
                                </form>

                                <div className="mt-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-300" />
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-white text-gray-500">
                                                Or continue with
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-6 width-full">
                                        <Github />
                                    </div>

                                    <div className="mt-2 width-full">
                                        <Google />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
}

export default Login;
