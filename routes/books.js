const router = require("express").Router();
const {
  validatePost
} = require("../joi_validation/Books");
const verifyToken = require("../verifyToken");
const Book = require("../model/Books");
const Video = require("../model/Video");

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
router.post("/upload", async (req, res) => {
  const {
    error
  } = validatePost(req.body);
  if (error) {
    console.log(error);
    return res.send(error.details[0].message);
  }
  const book = new Book({
    authorId: req.body.authorId,
    title: req.body.title,
    description: req.body.description,
    readTime: req.body.readTime,
    category: req.body.category,
    language: req.body.language,
    author: req.body.author,
    thumbnailImg: req.body.thumbnailImg,
    pdfLink: req.body.pdfLink,
  });
  try {
    const savedBook = await book.save();
    console.log("uploaded new book");
    res.send({
      message: "Success"
    });
  } catch (err) {
    res.send(err);
  }
});
// router.get("/trial/", async (req, res) => {
//   try {
//     const {
//       trial
//     } = req.query;
//     if (trial) {
//       console.log(trial);
//     } else {
//       console.log("empty trial");
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });
router.get("/get/", async (req, res) => {
  try {
    const {
      category,
      language,
      authorId,
      bookId,
      searchText
    } = req.query;
    if (category) {
      if (category === "All") {
        console.log("search insearch text");
        const getAdv = await Book.find({});
        if (language === "All") {
          res.send(getAdv);
        } else {
          res.send(getAdv.filter(book => book.language === language));
        }
      } else {
        console.log("category searched");
        const getAdv = await Book.find({
          category: category,
        });
        if (language === "All") {
          res.send(getAdv);
        } else {
          res.send(getAdv.filter(book => book.language === language));
        }
      }
    } else if (authorId) {
      console.log("searched in author id");
      const getAdv = await Book.find({
        authorId: authorId,
      });
      res.send(getAdv);
    } else if (bookId) {
      console.log("searched in book id");
      const getAdv = await Book.find({
        _id: bookId,
      });
      res.send(getAdv);
    } else if (searchText) {
      const regex = new RegExp(escapeRegex(searchText), 'gi');
      console.log("search insearch text " + regex);
      const getAdv1 = await Book.find({
        author: regex
      });
      const getAdv2 = await Book.find({
        title: regex
      });
      const getAdv = [...getAdv1, ...getAdv2];
      res.send(getAdv);
    }
  } catch (err) {
    res.send(err);
  }
});

router.post("/updateVotes/", async (req, res) => {
  try {
    const {
      _id
    } = req.query;
    const video = await Video.findOne({
      _id: _id,
    });
    let views = video.views;
    const updatedBook = await Video.updateOne({
      _id: _id,
    }, {
      views: views + 1,
    });
    if (updatedBook.ok) {
      console.log("updated vote");
      res.send(updatedBook);
    } else {
      console.log("failed");
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
router.post("/votes", async (req, res) => {
  try {
    const bookId = req.body.bookId;
    const book = await Book.findOne({
      _id: bookId,
    });
    let votes = parseInt(book.votes);
    console.log(votes);
    const updatedBook = await Book.updateOne({
      _id: bookId,
    }, {
      votes: votes + 1,
    });
    if (updatedBook.ok) {
      console.log("updated vote");
      res.send(updatedBook);
    } else {
      console.log("failed");
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
router.get("/verify", verifyToken, async (req, res) => {
  res.send(true);
});

module.exports = router;