"use strict";
var settings = {
    port: process.env.PORT || 1410,
    mongo: {
        uri: process.env.MONGO_URI || 'mongodb://localhost/celebrate-taste-dev'
    },
    gaCode: 'UA-72165579-2',
    externalUrl: 'https://stg.celebrate-taste.ro'
};
exports.settings = settings;
