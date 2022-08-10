import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const postSchema = new mongoose.Schema({
  title: { type: String, index: true },
  body: { type: String, index: true },
  cover: { type: String, index: true },
},
  {
    timestamps: true
  })

const paintingSchema = new mongoose.Schema({
  title: { type: String, index: true },
  description: { type: String, index: true },
  topic: { type: String, index: true },
  price: { type: Number, index: true },
  sold: { type: Boolean, index: true, default: false },
  image: { type: String, index: true }
})

const subscriber = new mongoose.Schema({
  email: { type: String, index: true },
  addr: { type: String, index: true }
})

export const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export const Pic = mongoose.models.Pic || mongoose.model("Pic", paintingSchema);
export const Sub = mongoose.models.Sub || mongoose.model("Sub", subscriber)