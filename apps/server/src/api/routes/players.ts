import { Router } from "express"

import * as playerController from "../controllers/playerController"

const router = Router()

router.get("/:name/:tag", playerController.getPlayer)

export default router