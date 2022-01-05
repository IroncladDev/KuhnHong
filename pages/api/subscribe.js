import nc from 'next-connect'
const app = nc();
import requestIp from 'request-ip'
import { Sub } from '../../scripts/mongo.js'
import md5 from 'md5';

app.post(async (req, res) => {
  try {
    let __sub = await Sub.findOne({ addr: md5(requestIp.getClientIp(req)) });
    if (__sub) {
      res.json({
        success: false,
        message: "You've already subscribed.  I appriate it, but you can only subscribe once."
      })
    } else {
      let sub = new Sub({
        email: req.body.email,
        addr: md5(requestIp.getClientIp(req))
      });
      sub.save();
      res.json({ success: true })
    }
  } catch (e) {
    res.json({
      success: false,
      message: "Internal Error"
    })
  }
})

export default app