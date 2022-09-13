import dataAccess from "../data/database/dataAccess";

export default {
    createNewUser: (user: string): string => {
        dataAccess.postUser(user);
        return `New user ${user} created`;
    },
};
