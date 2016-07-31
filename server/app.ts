import { app } from "./server";

let server = app.listen(1410, function () {
    console.log("Express server listening on port 1410");
});

export { server }