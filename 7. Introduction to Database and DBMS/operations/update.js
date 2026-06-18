// DB Query Update
db.products.updateOne({ title: "iphone" }, { $set: { amount: 455 } })
db.products.replaceOne({ title: "iphone" }, { title: "iphone 123" })
db.products.replaceMany({ title: "iphone" }, { title: "iphone 123" })

// DB Query Delete
