import {IConfig} from "./";

const stagingConfig = <IConfig> {
    mongo: {
        uri: process.env.MONGO_URI || "bbb"
    },
    gaCode: "UA-72165579-2",
    externalUrl: "https://stg.logspace.net"
};

export default stagingConfig;