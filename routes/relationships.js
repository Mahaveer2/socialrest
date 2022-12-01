import express from "express";
import { getRelationShips,addRelationShips,deleteRelationShips} from "../controllers/relationship.js";

const router = express.Router();

router.get("/",getRelationShips);
router.post("/",addRelationShips);
router.delete("/",deleteRelationShips);

export default router;