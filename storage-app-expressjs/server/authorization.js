import dirTreeDB from "./dirTreeDB.json" with {type: "json"};

const dirTreeArray = dirTreeDB;

function authorization(req, res, next){
    const {email, userId} = req.cookies;
    if(!email || !userId){
        return res.status(401).json({
            "error": "authorization failed!",
            "message": "please login again!"
        })
    }
      // checking if the email and userId is existed in the DB
    const isDirExist = dirTreeArray.find(dir=>{
        if(dir.userId === email) return true;
        return  false;
    });

    if(!isDirExist) {
        return res.status(201).json({
            "error": "invalid credentials!"
        })
    }
    req.email = email;
    req.userId = userId;
    return  next();
};

export default authorization;