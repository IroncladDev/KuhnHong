import nc from 'next-connect'
import { serialize } from 'cookie';
import {limiter} from '../../scripts/util.js'

const app = nc()
app.use(limiter(1000 * 60 * 60, 3, (req, res) => {
  res.status(429).json({ success: false, message: "Too many failed login attempts." })
}))
app.post((req, res) => {
  if (req.body.psw === process.env.ADMIN_PASSWORD) {
    res.setHeader('Set-Cookie', serialize('admin_session', process.env.ADMSS, { path: '/', expires: new Date(Date.now() + (1000 * 60 * 30)), }))
      .json({
        success: true
      })
  } else {
    res.json({
      success: false,
      message: "Incorrect Password"
    })
  }
})

export default app