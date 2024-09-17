import express, { Request, Response } from "express";
import users from "../app/user/user.route";
import workspaces from "../app/workspace/workspace.route";
import projects from "../app/project/project.route";
import flows from "../app/flow/flow.route";
import notes from "../app/note/note.route";
import permissions from "../app/permission/permission.route";

const router = express.Router();

/* GET home page. */
router.get('/', (req:Request, res:Response) => {
  res.send("Welcome to configuration service");
});

router.use("/users", users);
router.use("/workspaces", workspaces);
router.use("/projects", projects);
router.use("/flows", flows);
router.use("/notes", notes);
router.use("/permissions", permissions);

export default router;
