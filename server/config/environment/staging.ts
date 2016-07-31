import {IConfig} from "./";

const settings = <IConfig> {
    mongo: {
        uri: process.env.MONGO_URI || "mongodb://localhost/celebrate-taste-dev"
    },
    gaCode: "UA-72165579-2",
    externalUrl: "https://stg.logspace.net"
};

export { settings };