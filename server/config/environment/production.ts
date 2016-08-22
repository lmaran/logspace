import {IConfig} from "./";

const productionConfig = <IConfig> {
    mongo: {
        uri: process.env.MONGO_URI || "aaa"
    },
    gaCode: "UA-72165579-3",
    externalUrl: "https://logspace.net"
};

export default productionConfig;