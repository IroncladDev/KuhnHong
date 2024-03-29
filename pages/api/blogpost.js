import nc from 'next-connect'
const app = nc();
import { Post } from '../../scripts/mongo.js'


app.post(async (req, res) => {
  if (req.body.psw === process.env.ADMIN_PASSWORD) {
    try {
      let pst = new Post({
        title: req.body.title,
        body: req.body.body,
        cover: req.body.cover
      });
      pst.save();
      res.json({ success: true })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error"
      })
    }
  } else {
    res.json({
      success: false,
      message: "Incorrect Password"
    })
  }
})

export default app