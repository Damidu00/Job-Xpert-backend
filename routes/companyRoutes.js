import express from "express";
import { getCompany, getCompanyById, getupdateCompany, registerCompany} from "../controllers/companyController.js";

const router = express.Router();

router.route("/register").post(registerCompany);
router.route("/get").post(getCompany);
router.route("/get/:id").post(getCompanyById);
router.route("/update/:id").post(getupdateCompany);


export default router;
