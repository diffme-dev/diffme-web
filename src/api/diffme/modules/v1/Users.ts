import { FailureOrSuccess } from "../../core";
import { Module } from "../../domain/module";

export type MyUserResponse = {
    user: any;
};

class Users extends Module {
    me = async (): Promise<FailureOrSuccess<Error, MyUserResponse>> =>
        this.request.get({
            route: `/users/me`,
        });
}

export { Users };
