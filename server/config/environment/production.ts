import {IConfig} from './';

const settings = <IConfig>{
    port: process.env.PORT,
    mongo: {
        uri: process.env.MONGO_URI
    },
    gaCode: 'UA-72165579-3',
    externalUrl: 'https://celebrate-taste.ro'
};

export { settings };
