import { Router } from "express";
import user from "./user.route";

// all routes found in the routes folder.
const routers: Router[] = [user];

export default routers;
