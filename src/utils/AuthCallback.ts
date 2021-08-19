import Helpers from "./Helpers";
import api from "src/api";
import { failure, success } from "src/core/logic/FailureOrSuccess";
import { useDispatch } from "react-redux";
import { history } from "src/App";
import { Segment } from "./Segment";

const useQueryHandler = () => {
    const dispatch = useDispatch();

    const handleQuery = async (query: any) => {
        switch (query.action) {
        }

        return failure(new Error("no query"));
    };

    return { handle: handleQuery };
};

export const AuthCallback = { useQueryHandler };
