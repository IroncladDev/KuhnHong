import nc from 'next-connect'
import { Post } from '../../scripts/mongo.js'

const app = nc()
app.get(async (req, res) => {
  res.json(await Post.find({})||[])
})

export default app