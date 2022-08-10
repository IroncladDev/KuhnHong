import nc from 'next-connect'
import { Pic } from '../../scripts/mongo.js'

const app = nc()
app.post((req, res) => {
  console.log(req.body)
  if (req.body.auth === process.env.ADMSS || req.cookies.admin_session === process.enc.ADMSS) {
    let pic = new Pic({
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      topic: req.body.topic,
      price: Number(req.body.price),
      sold: eval(req.body.sold),
    });
    pic.save();
    res.json({ success: true });
  } else {
    res.statusCode(401).json({ success: false, message: "Unauthorized Attempt.  Please log in again." })
  }
})

export default app