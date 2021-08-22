import { FailureOrSuccess } from "../../core";
import { Module } from "../../domain/module";

export type SnapshotCreatedResponse = {
    snapshot: any;
};

export type SnapshotsForReferenceResponse = {
    snapshot: any;
};

class Snapshots extends Module {
    create = async (
        data: any
    ): Promise<FailureOrSuccess<Error, SnapshotCreatedResponse>> =>
        this.request.post<SnapshotCreatedResponse>({
            route: `/snapshots`,
            data,
        });

    forReferenceId = async (
        referenceId: string
    ): Promise<FailureOrSuccess<Error, SnapshotsForReferenceResponse>> =>
        this.request.get<SnapshotsForReferenceResponse>({
            route: `/snapshots/reference/${referenceId}`,
        });
}

export { Snapshots };
