# mongosh commands
mongosh
show dbs
use test
db.users.insertOne({username: "theniteshdev", email:"nitesh@gmail.com"})

db.users.find()

# commands to read and upload a json file into mongodb
fs.readFileSync("./users.json", "utf-8") # return string
JSON.parse(fs.readFileSync("./users.json", "utf-8")) # convert into array
db.tasks.insertMany(JSON.parse(fs.readFileSync("./users.json", "utf-8"))) # finally inserted

# find documents using $in operator
db.tasks.find({task:{$in:[1,7,9]}})
# if the value not found its does not find for that

# find and updateMany 
db.tasks.updateMany({author:{$in:['nitesh']}}, {$unset: {author:'nitesh'}})
db.tasks.updateMany({task:{$in:[1,2,3]}}, {$set: {author:'nitesh'}})


# find and deleteMany
db.tasks.deleteMany({task:{$in:[7,6]}})