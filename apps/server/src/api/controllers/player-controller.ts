import { Request, Response } from "express"

export async function getPlayer(req: Request, res: Response){
    const { name, tag } = req.params
    
    res.json({
        gameName: name,
        tagLine: tag,
        impactScore: 87
    })
}