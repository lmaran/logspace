"use strict";
var settings = {
    port: process.env.PORT,
    mongo: {
        uri: process.env.MONGO_URI
    },
    gaCode: 'UA-72165579-3',
    externalUrl: 'https://celebrate-taste.ro'
};
exports.settings = settings;
