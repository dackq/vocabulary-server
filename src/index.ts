import server from "./backend/server/server";
import dataAccess from "./backend/data/database/dataAccess";
import fs from "node:fs/promises";
import crypto from "crypto";

(async () => {
    // get local environment variables
    try {
        await fs.access("./config/.env");
    } catch {
        // if a env config file is not found then create one
        const secret = crypto.randomBytes(20).toString("hex");
        const config = `PORT=3000\nSESSION_SECRET=${secret}`;
        try {
            await fs.writeFile("./config/.env", config);
        } catch (error) {
            throw error;
        }
    }
    require("dotenv").config({ path: "./config/.env" });

    // connect to the database
    dataAccess.connect("sqlite::memory");

    // start server
    try {
        await server.listen(parseInt(`${process.env.PORT}`));
        console.log(`Server is listening on port ${process.env.PORT}`);
    } catch (error) {
        console.error(`Unable to start server`, error);
    }
})();
