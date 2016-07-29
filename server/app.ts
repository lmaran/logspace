import { app } from "./server";

let server;
// if (!module.parent) {
    server = app.listen(1410, function () {
        console.log("Express server listening on port 1410");
    });
// }

export { server }