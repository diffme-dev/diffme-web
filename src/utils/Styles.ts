import * as Colors from "./Colors";
import { CSSProperties } from "react";

const shadow = {
    boxShadow: "0 2px 4px 0 rgba(14, 30, 37, 0.06)",
};

const modalStyles = {
    overlay: {
        backgroundColor: "rgba(0,0,0,0.75)",
        zIndex: 100000,
    },
    content: {
        overflow: "visible",
        maxHeight: "90%",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-45%",
        width: "90%",
        maxWidth: 600,
        transform: "translate(-50%, -50%)",
        padding: 20,
    },
};

const body: CSSProperties = {
    textAlign: "center",
    width: "100%",
    padding: "50px 10px",
    minHeight: "100%",
    overflow: "hidden",
};

const container: CSSProperties = {
    backgroundColor: "#ffffff",
    border: "1px solid #efefef",
    marginBottom: 100,
    maxWidth: 600,
    width: "100%",
    margin: "auto",
    borderRadius: 5,
    // height: 700,
    overflow: "hidden",
    textAlign: "center",
    ...shadow,
};

const flexRow: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
};

const flexCol: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
};

export default {
    flexRow,
    flexCol,
    colors: Colors,
    shadow,
    modalStyles,
    body,
    container,
};
