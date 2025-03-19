import express from "express";
import { deleteCompany, getCompany, getCompanyById, getupdateCompany, registerCompany} from "../controllers/companyController.js";

const router = express.Router();

router.route("/register").post(registerCompany);
router.route("/get").get(getCompany);
router.route("/get/:id").get(getCompanyById);
router.route("/update/:id").put(getupdateCompany);
router.route("/delete/:id").delete(deleteCompany);


export default router;
