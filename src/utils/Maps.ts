import fp from "lodash/fp";

// https://developers.google.com/maps/documentation/geocoding/intro#Types
// street_address = street's address
// locality = city
// postal_code = zip code
// administrative_area_level_1 = state in US
type AddressType =
    | "street_address"
    | "street_number"
    | "route"
    | "locality"
    | "political"
    | "postal_code"
    | "country"
    | "administrative_area_level_1";

type AddressComponent = {
    long_name: string;
    short_name: string;
    types: AddressType;
};

export type FormattedAddress = {
    street: string | null;
    city: string | null;
    zipcode: string | null;
    state: string | null;
};

const _findComponent = fp.curry((field: string) =>
    fp.find((component: AddressComponent) => component.types.includes(field))
);

export const formatGoogleAddress = (
    addressComponents: AddressComponent[]
): FormattedAddress => {
    let streetAddress =
        _findComponent("street_address")(addressComponents)?.long_name;

    if (!streetAddress) {
        const streetNumber =
            _findComponent("street_number")(addressComponents)?.long_name;
        const street = _findComponent("route")(addressComponents)?.long_name;
        streetAddress =
            streetNumber && street ? streetNumber + " " + street : undefined;
    }

    const city = _findComponent("locality")(addressComponents)?.long_name;
    const zipcode = _findComponent("postal_code")(addressComponents)?.long_name;
    const state = _findComponent("administrative_area_level_1")(
        addressComponents
    )?.short_name;

    return {
        street: streetAddress || null,
        city: city || null,
        zipcode: zipcode || null,
        state: state || null,
    };
};

export const wrapCoords = (coords: [number, number]): [number, number] => {
    return [coords[0] % 180, coords[1] % 85];
};
