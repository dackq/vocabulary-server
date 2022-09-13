import express from "express";
import path from "path";
import routers from "./routes/routes.config";
import controller from "../controller/controller";

const server = express();

export default {
    /**
     * Start listening on the given port
     */
    async listen(port: number) {
        // load middleware
        server.use(express.json());

        // serve ui
        server.get("/", (req, res) => {
            res.sendFile(path.resolve("./public/index.html"));
        });

        // attach routes
        for (let router of routers) {
            server.use("/api", router);
        }

        return new Promise((resolve, reject) => {
            server.listen(port, () => {
                resolve(undefined);
            });
        });
    },
};
