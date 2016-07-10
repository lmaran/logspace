// for logoutController
declare module 'express-serve-static-core' {
    import * as http from 'http';
    interface Response extends http.ServerResponse, Express.Response {
        header(field: string, value?: string[]): Response;
    }
}

declare module 'winston' {
    interface Transports {
        RollbarLogger: any;
    }

    let config: any;
}
