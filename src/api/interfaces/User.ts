export interface ICardSource {
    last4: string;
    brand: string;
    sourceId: string;
    expiration: string;
}

export interface IExternalAccount {
    last4: string;
    brand: string;
    sourceId: string;
}

export interface IUser {
    _id: string;
    // Normal user info
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    profileUrl: string;
    phoneNumber: string;
    referralCode: string;
    birthday: string;
    notes: string;
    facebookUsername: string;
    isExpander: boolean;
    name: string; // virtual field

    metrics: {
        numberOfPurchases: number;
        lastPurchaseDate: Date;
    };

    activeCompanyId: string;

    // Financial info
    accountId: string;
    customerId: string;
    activePaymentId: string;
    activeSourceId: string;
    sources: ICardSource[];
    externalAccounts: IExternalAccount[];
    balance: number;
    points: number;
    deleted: boolean;
    address: {
        street: string;
        city: string;
        state: string;
        zipcode: string;
    };
    tosAccepted: boolean;
    ssnLast4: boolean;
    activeAccountId: string;
    admin: {
        isAdmin: boolean;
        dashboard: boolean;
        accountIds: string[];
    };
    notifications: {
        email: boolean;
        phone: boolean;
    };
    createdAt: Date;
    updatedAt: Date;
}
