import nc from 'next-connect'
const app = nc();
import { Sub } from '../../scripts/mongo.js'


app.post(async (req, res) => {
  if (req.body.psw === process.env.ADMIN_PASSWORD) {
    try {
      let subs = await Sub.find({});
      let data = await fetch("https://kuhnhong.devservers.repl.co/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*"
        },
        body: JSON.stringify({
          subject: req.body.title,
          body: req.body.body,
          subs: subs
        })
      }).then(r => r.json())

      res.json({
        success: data.success,
        message: data.message
      });

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