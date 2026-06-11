import express from "express";

const app = express();

const blogs = [
    {
        "author": "theniteshdev",
        "id": "blg1",
        "createdAt": "",
        "views": "",
        body: "these days ai is gonna very clingy",
        "comments": [
            {
                id: 'c1',
                body: "Its, very fun!"
            },
            {
                id: 'c2',
                body: "correct, i am fired from my company 😭"
            },
            {
                "id": "c3",
                body: "any solution !?"
            }
        ]
    },
    {
        "author": "anurag-sir",
        "id": "blg2",
        "createdAt": "",
        "views": "",
        body: "People wondering and wants to learn nodejs in depth but they don't know the way of learning. Comment me i will replie everyone.",
        "comments": [
            {
                id: 'c1',
                body: "really with me too"
            },
            {
                id: 'c2',
                body: "sir please help me I am fired 😭"
            },
            {
                "id": "c3",
                body: "i wants replie"
            }
        ]
    },
]

app.get("/blogs", (req, res) => {
    res.status(200).json({
        blogs
    })
});
app.get("/blog/:blogId", (req, res) => {
    const { blogId } = req.params;
    res.status(200).json({
        blog: {
            ...blogs.find((blog) => {
                if (blog.id === blogId) return true;
                return false;
            })
        }
    })
});

app.get("/blog/:blogId/comment/:commentId", (req, res) => {
    const { blogId, commentId } = req.params;
    res.status(200).json({
        "comment": {
            ...blogs.find(blog => {
                if (blog.id === blogId) return true;
                return false;
            }).comments.find(comment => {
                if (comment.id === commentId) {
                    return true;
                }
                return false;
            })
        } 
    })
});

app.listen(4030, 'localhost', (err) => console.log("running at port 4030"))