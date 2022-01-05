import nc from 'next-connect'
import { Pic } from '../../scripts/mongo.js'

const app = nc()
app.get(async (req, res) => {
  res.json(await Pic.find({})||[])
})

export default app