import { Formik } from "formik";
import { compose, getOr } from "lodash/fp";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Logo from "src/components/Logo";
import Button from "src/components/styled/Button";
import { setUserLoggedIn } from "src/redux/reducers/user";
import { Firebase } from "src/utils";
import Authentication, { getLoginErrorMessage } from "src/utils/Authentication";
import { INITIAL_USER, FormValues, UserValidator } from "./form";
import * as yup from "yup";

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
                    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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
                                            label="Sign in"
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

                                {/*TODO: add back github <div className="mt-6">
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

                                    <div className="mt-6">
                                        <div>
                                            <div
                                                onClick={() => {}}
                                                className="cursor-pointer relative w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                            >
                                                <svg
                                                    className="w-5 h-5 absolute left-6"
                                                    aria-hidden="true"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>

                                                <div className="font-semibold">
                                                    Sign in with GitHub
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            */}
                            </div>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
}

export default Login;
