import { v2 } from "cloudinary";
import nc from 'next-connect'

v2.config({
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
});

const app = nc();

app.post(async (req, res) => {
  if (
    req.body.auth === process.env.ADMSS ||
    req.cookies.admin_session === process.enc.ADMSS
  ) {
    const result = await v2.uploader.upload(req.body.base64, {
      resource_type: "auto",
    });

    res.json({ success: true, url: result.secure_url });
  } else {
    res.statusCode(401).json({
      success: false,
      message: "Unauthorized Attempt.  Please log in again.",
    });
  }
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb',
    },
  },
};

export default app;
