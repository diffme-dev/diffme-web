import { FailureOrSuccess } from "../../core";
import { Module } from "../../domain/module";

export type ChangeSearchRequest = {
    limit?: number;
    reference_ids?: string[];
    editor?: string;
    field?: string;
    value?: string;
};

export type ChangeSearchResponse = {
    changes: any[];
};

export type ChangeForReferenceId = {
    changes: any[];
};

class Changes extends Module {
    list = async (
        query: any
    ): Promise<FailureOrSuccess<Error, ChangeSearchResponse>> =>
        this.request.get({
            route: `/changes`,
            query,
        });

    search = async (
        query: ChangeSearchRequest
    ): Promise<FailureOrSuccess<Error, ChangeSearchResponse>> =>
        this.request.get({
            route: `/changes/search`,
            query,
        });

    forReferenceId = (
        referenceId: string
    ): Promise<FailureOrSuccess<Error, ChangeForReferenceId>> =>
        this.request.get({
            route: `/changes/references/${referenceId}`,
        });
}

export { Changes };
