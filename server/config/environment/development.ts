import {IConfig} from './';

const settings = <IConfig> {
    port: 1410,
    mongo: {
        uri: 'mongodb://localhost/celebrate-taste-dev'
    }
};

export { settings };
