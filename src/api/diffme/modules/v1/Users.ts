import { FailureOrSuccess } from "../../core";
import { Module } from "../../domain/module";

export type MyUserResponse = {
    user: any;
};

class Users extends Module {
    me = async (): Promise<FailureOrSuccess<Error, MyUserResponse>> => {
        console.log(this.request);

        return this.request.get({
            route: `/users/me`,
        });
    };

    create = async (
        data: any
    ): Promise<FailureOrSuccess<Error, MyUserResponse>> => {
        console.log(this.request);

        return this.request.post({
            route: `/users`,
            data,
        });
    };
}

export { Users };
