import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { deleteCompany, getCompany, getCompanyById, getupdateCompany, registerCompany} from "../controllers/companyController.js";

const router = express.Router();

router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").put(isAuthenticated,getupdateCompany);
router.route("/delete/:id").delete(isAuthenticated,deleteCompany);


export default router;
