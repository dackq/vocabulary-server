import { Sequelize } from "sequelize";

/**
 * This module is used to connect to and access the databse
 */

let sequelize: Sequelize;

/**
 * Connects to database located at the provided url
 */
const connect = async (url: string) => {
    // connect to the database
    sequelize = new Sequelize(url);
    try {
        await sequelize.authenticate();
        console.log("Database connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

/**
 * Function decorator that checks that the database is connected before
 * performing an operation
 */
const checkDatabaseConnection = (action: Function) => {
    return () => {
        if (sequelize) {
            action();
        } else {
            // FIXME use better error handling
            throw new Error("Attempted to access database before connection");
        }
    };
};

/**
 * Logs the name of a function before performing it
 */
const logAction = (action: Function) => {
    return () => {
        console.log(`Performing ${action.name} on database.`);
    };
};

// declare functions in an object so that we can manipulate them later
const dataManipulationFunctions = {
    postUser: (user: string) => {
        console.log("added a user");
    },
    getUser: (user: string) => {
        console.log(`Returning ${user}`);
    },
};

// add decorators to data manipulation functions
// must define type of key here to avoid errors
// (https://effectivetypescript.com/2020/05/26/iterate-objects/)
let key: keyof typeof dataManipulationFunctions;
for (key in dataManipulationFunctions) {
    // log every action
    dataManipulationFunctions[key] = logAction(dataManipulationFunctions[key]);
    // perform a check that the database is connected
    dataManipulationFunctions[key] = checkDatabaseConnection(
        dataManipulationFunctions[key]
    );
}

export default { connect, ...dataManipulationFunctions };
