// http redirection
import express from "express";

const app = express();
function  handleRedirection(req, res){

    // res.status(301);
    // res.set({
    //     "location": "/items"
    // });

    res.redirect("/items")

    // res.writeHead(308, {
    //     "location": "/items"
    // });

    /*
    res.status(301);
    res.set({
    "location":"/items"
    });

    res.setHeader({
    "location":"/items"
    })
     */
    res.end();
}
function returnProducts(req, res){
    res.status(200).json({
        "message": "products found!",
        data: [
            {
                "id": '4f4gtt5',
                "name": "mac mini m3",
                "price": "$1399",
                "brand": "apple"
            },
            {
                "id": '58ty6',
                "name": "keyboard and mouse combo",
                "price": "$159",
                "brand": "dell"
            },
            {
                "id": '8i7u7y',
                "name": "acer tab t8",
                "price": "$239",
                "brand": "acer"
            },
        ]
    })
}

app.get("/products", handleRedirection);
app.get("/items", returnProducts)

app.listen(2001, err=> console.log("running at port 2001"))