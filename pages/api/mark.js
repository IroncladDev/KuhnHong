import nc from 'next-connect'
const app = nc();
import { Pic } from '../../scripts/mongo.js'


app.post(async (req, res) => {
  if (req.body.psw === process.env.ADMIN_PASSWORD) {
    try {
      let mark = await Pic.findOne({ _id: req.body.dataId });
      mark.sold = true;
      mark.save();
      res.json({
        success: true
      })
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