const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
    filePath: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    views: {
        type: Number,
        required: true,
    },
    watch: {
        type: Date,
        required: true,
    },
    minutes: {
        type: String,
        required: true,
    },
    seconds: {
        type: String,
        required: true,
    },
    hours: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("videos", videoSchema);

/*router.get("/getVideo/", async (req, res) => {
  try {
    const getAdv = await Video.find({});
    res.send(getAdv);
  } catch (err) {
    res.send(err);
  }
});*/