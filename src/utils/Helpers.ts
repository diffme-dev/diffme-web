import * as BytesHelper from "bytes";
import Dinero from "dinero.js";
import parsePhoneNumber from "libphonenumber-js";
import { get, set } from "lodash";
import isString from "lodash/isString";
import moment from "moment";
import pluralize from "pluralize";
import {
    failure,
    FailureOrSuccess,
    success,
} from "src/core/logic/FailureOrSuccess";

export default class Helpers {
    static DD(dollars: number): Dinero.DineroObject {
        if (!dollars) {
            throw new Error("no dollars!");
        }

        return Dinero({ amount: Math.round(dollars * 100) }).toObject();
    }

    static firstChar(str: string): string | null {
        if (!str) {
            return null;
        }

        return str.charAt(0).toUpperCase();
    }

    static getHttpsUrl(s: string | null): string {
        if (!s) {
            return "";
        }

        return s.includes("http://") || s.includes("https://")
            ? s
            : `https://${s}`;
    }
    static plural(s: string | null): string {
        if (!s) {
            return "";
        }

        return pluralize(s);
    }
    static singular(s: string | null): string {
        if (!s) {
            return "";
        }

        return pluralize.singular(s);
    }

    static formatEIN(s: string | null): string {
        if (!s) {
            return "";
        }
        if (typeof s !== "string") return "";

        if (s.length <= 2) {
            return s;
        }

        return s.slice(0, 2) + "-" + s.slice(2);
    }

    static formatPhoneNumber = (einPhone: string): string | null => {
        const phoneNumber = parsePhoneNumber(einPhone);

        if (!phoneNumber) {
            return null;
        }

        if (!phoneNumber.isValid()) {
            return null;
        }

        return phoneNumber.formatNational();
    };

    static upsert = (
        list: any[],
        item: any,
        comparisonField: string = "id"
    ): any[] => {
        const exists = list.find(
            (l) => l[comparisonField] === item[comparisonField]
        );

        if (exists) {
            return list.map((l) =>
                l[comparisonField] === item[comparisonField] ? item : l
            );
        }

        return [...list, item];
    };

    static fromNow(date: Date | null): string | null {
        if (!date) {
            return null;
        }
        const momentDate = moment(date);

        // less than a minute is just now
        if (moment().diff(momentDate, "milliseconds") < 60 * 1000) {
            return "just now";
        }

        return moment(momentDate)
            .fromNow(true)
            .replace("days", "d")
            .replace("day", "d")
            .replace("hours", "h")
            .replace("hour", "h")
            .replace("minutes", "m")
            .replace("minute", "m")
            .replace("months", "M")
            .replace("month", "M")
            .replace("years", "Y")
            .replace("year", "Y")
            .replace(/an/g, "1")
            .replace(/a/g, "1")
            .replace(/ /g, "");
    }

    /**
     * Safely parse json. This function does not throw, just returns
     * a failure or success obj
     *
     * @param json the stringified json
     * @returns the parsed json
     */
    static maybeParseJSON = <T>(
        json?: string | null
    ): FailureOrSuccess<Error, any> => {
        if (!json) {
            return failure(new Error("empty json"));
        }

        try {
            const parsed = JSON.parse(json);
            return success(parsed as unknown as T);
        } catch (err) {
            return failure(err);
        }
    };

    static maybeParseInt = (number?: any): FailureOrSuccess<Error, number> => {
        try {
            const parsed = parseInt(number);
            return success(parsed);
        } catch (err) {
            return failure(err);
        }
    };

    /**
     * Safely stringifies json. This function does not throw, just returns
     * a failure or success obj
     *
     * @param json the json
     * @returns the stringified json
     */
    static maybeStringifyJSON = (
        json: any
    ): FailureOrSuccess<Error, string> => {
        try {
            const message = JSON.stringify(json);

            return success(message);
        } catch (err) {
            return failure(err);
        }
    };

    static valueToLabel(s: string | null): string {
        if (!s) {
            return "";
        }
        if (typeof s !== "string") return "";
        return s.replace(/_/g, " ").split(" ").map(this.capitalize).join(" ");
    }
    static capitalize(s: string | null): string {
        if (!s) {
            return "";
        }
        if (typeof s !== "string") return "";
        return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    }
    static bytesToReadableString(bytes: number, decimalPlaces = 1): string {
        if (!bytes) {
            return (0).toFixed(decimalPlaces);
        }
        const bytesString = BytesHelper(bytes, {
            decimalPlaces,
        });
        return bytesString && isString(bytesString)
            ? bytesString.toLowerCase()
            : "N/A";
    }
    static nullify(object, path: any) {
        const value = get(object, path);
        // If path is undefined, "", or null,
        // set that path on the object to null
        if (!value) {
            set(object, path, null);
        }
    }
    static sortByDescending(a: any, b: any, field = "createdAt"): number {
        return get(a, field) > get(b, field) ? -1 : 1;
    }
    static sortByAscending(
        a: any,
        b: any,
        field: string = "createdAt"
    ): number {
        return get(a, field) < get(b, field) ? -1 : 1;
    }
    static hashFromString(str: string): number {
        if (!str) {
            return 0;
        }
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    }
    static _intToRGB(i: number): string {
        const c = (i & 0x00ffffff).toString(16).toUpperCase();

        return "00000".substring(0, 6 - c.length) + c;
    }
    static stringToColor(str: string) {
        return this._intToRGB(this.hashFromString(str));
    }

    static shortenNumWords(
        text: string,
        numberOfWords: number,
        endingString: string = "."
    ) {
        if (!text) {
            return "";
        }
        const words = text.split(" ");
        return (
            words.slice(0, numberOfWords).join(" ") +
            (numberOfWords < words.length ? endingString : "")
        );
    }

    static shorten(text: string, length: number, characters = ".") {
        if (!text) return "";
        if (text.length > length) {
            // Get first x
            const sliceOfText = text.slice(0, length);
            // trim the text and add characters to it
            text = sliceOfText.trim() + characters;
        }
        return text;
    }
    /**
     * Converts a list to a dictionary
     * @param {Any[]} list A list of items
     * @param {String} uniqueKey A unique key in the items
     */
    static listToDictionary(list: any[], uniqueKey: string = "_id") {
        const dict: any = {};
        if (!list) return dict;
        for (const item of list) {
            const key = item[uniqueKey];
            if (key) {
                dict[key] = item;
            }
        }
        return dict;
    }
    /**
     * Converts a dictionary to a list
     * @param {Object} dict A dictionary
     */
    static dictionaryToList(dict: any) {
        if (!dict) {
            return [];
        }
        return Object.values(dict);
    }

    /**
     * Returns the percent as a decimal.
     *
     * @param {Number} amount The amount of percent as a whole number
     * @param {Number} numberOfPlaces The amount of places to round
     * @return {Number} The decimal, ie. 0.4565
     */
    static percentToDecimal(
        amount: number,
        numberOfPlaces: number = 4
    ): number {
        numberOfPlaces = 10 ** numberOfPlaces;
        return (amount * 0.01 * numberOfPlaces) / numberOfPlaces;
    }

    /**
     * Returns the decimal as a percent.
     *
     * @param {Number} amount The amount of percent as a decimal 0.4608
     * @param {Number} numberOfPlaces The amount of places to round
     * @return {Number} The decimal, ie. 0.4608
     */
    static decimalToPercent(
        amount: number,
        numberOfPlaces: number = 4
    ): number {
        numberOfPlaces = 10 ** numberOfPlaces;
        return (amount * 100 * numberOfPlaces) / numberOfPlaces;
    }
}
