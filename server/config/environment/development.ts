import {IConfig} from './';

const settings = <IConfig> {
    port: 1410,
    mongo: {
        uri: 'mongodb://localhost/logspace-dev'
    }
};

export { settings };
