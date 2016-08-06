// process.env.NODE_ENV = process.env.NODE_ENV || "development";

import * as path from "path";
import * as _ from "lodash";

import developmentConfig from "./development";
import stagingConfig from "./staging";
import productionConfig from "./production";
import testConfig from "./test";

let envConfig = {
    development: developmentConfig,
    staging: stagingConfig,
    production: productionConfig,
    test: testConfig
};

// All configurations will extend these options
// ============================================

interface IConfig {
    env: string;
    root: string;
    port: number;
    userRoles: string[];
    secrets: any;
    mongo: any;
    rollbarToken: string;
    gaCode: string;
    externalUrl: string;
}

let common = <IConfig> {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 1410,
    root: path.normalize(__dirname + "/../../.."), // 3 folders back from the current folder
    mongo: {
        options: {
            db: {
                // safe: true // in Mongo 2.0 this option is "true" by default and is equals to {w:1} - http://stackoverflow.com/a/14801527
            }
        }
    },

    rollbarToken: "c40dd41c292340419923230eed1d0d61",
};

const config = _.merge(
    common,
    envConfig[common.env]);

export { IConfig };
export default config;
