export async function getPlayer(req, res){
    const { id } = req.params
    const player = await playerService.getPlayer(id)

    res.json(player)
}