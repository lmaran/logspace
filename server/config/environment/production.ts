import {IConfig} from "./";

const settings = <IConfig> {
    mongo: {
        uri: process.env.MONGO_URI
    },
    gaCode: "UA-72165579-3",
    externalUrl: "https://logspace.net"
};

export { settings };
