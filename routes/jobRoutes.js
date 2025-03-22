import express from "express";
import { 
    getAdminJobs, 
    getAllJobs, 
    getJobById, 
    postJob, 
    editJob, 
    deleteJob 
} from "../controllers/jobController.js";

const router = express.Router();

router.route("/post").post(postJob);
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").get(getAdminJobs);
router.route("/get/:id").get(getJobById);
router.route("/edit/:id").put(editJob);
router.route("/delete/:id").delete(deleteJob);

export default router;
