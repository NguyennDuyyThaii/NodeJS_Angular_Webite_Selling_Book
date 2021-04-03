const mongoose = require('mongoose')

let Shema = mongoose.Schema

let bookSchema = new Shema({
    name: String,
    avatar: { type: String, default: null },
    images: { type: Array, default: null },
    price: { type: Number },
    des_short: String,
    des_detail: String,
    cate_id: {
        type: mongoose.Types.ObjectId,
        ref: "category"
    },
    author_id: {
        type: mongoose.Types.ObjectId,
        ref: "author"
    },
    createdAt: { type: String, default: Date.now },
    updatedAt: { type: String, default: Date.now }
}, {
    toJSON: { virtuals: true }
})

bookSchema.virtual("categories", {
    ref: "category",
    localField: "cate_id",
    foreignField: "_id"
})
bookSchema.virtual("authors", {
    ref: "author",
    localField: "author_id",
    foreignField: "_id"
})
bookSchema.statics = {
    createNew(item) {
        return this.create(item)
    },
    listAll() {
        return this.find().populate("categories").populate("authors")
    }
}
module.exports = mongoose.model("book", bookSchema)