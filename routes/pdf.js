const router = require('express').Router();
const {
    validatePdf
} = require('../joi_validation/Pdf');
const verifyToken = require('../verifyToken');
const Pdf = require('../model/Pdf');

router.post('/upload', async (req, res) => {
    const {
        error
    } = validatePdf(req.body);
    if (error) {
        console.log(error);
        return res.send(error.details[0].message);
    }
    const pdf = new Pdf({
        authorId: req.body.authorId,
        pdf: req.body.pdf,
        title: title.body.title
    })
    try {
        const savedPdf = await pdf.save();
        console.log("uploaded new add");
        res.send(savedPdf);
    } catch (err) {
        res.send(err);
    }
    res.send(true);
});

router.get('/get/', async (req, res) => {
    try {
        const {
            authorId,
            bookId,
            title,
            author
        } = req.query;
        if (author === "all") {
            if (!authorId.includes("null")) {
                console.log("searched in author id");
                const getAdv = await Pdf.find({
                    authorId: authorId
                });
                res.send(getAdv);
            } else if (!bookId.includes("null")) {
                console.log("searched in book id");
                const getAdv = await Pdf.find({
                    _id: bookId
                });
                res.send(getAdv);
            } else if (!title.includes("0")) {
                console.log("search insearch text");
                const getAdv = await Pdf.find({
                    title: title
                });
                res.send(getAdv);
            }
        } else {
            console.log("author searched");
            const getAdv = await Pdf.find({
                category: category
            });
            res.send(getAdv);
        }
    } catch (err) {
        res.send(err);
    }
})

router.get('/verify', verifyToken, async (req, res) => {
    res.send(true);
});

module.exports = router;