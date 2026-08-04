# upload a file
curl -X POST -F "file=@/home/nitesh/img.png" -H "filename: img1.png" -v --cookie "uid=6a396dd46fdf6557354f7fb2" http://localhost:4000/file/
echo "file uploaded successfully done!"

# get a file
curl -X GET -v --cookie "uid=6a396dd46fdf6557354f7fb2" http://localhost:4000/file/6a3ad22c9a69a6c836aabf23
echo "file successfully downloaded!"

# update filename
curl -X PATCH -v --cookie "uid=6a396dd46fdf6557354f7fb2" -H "Content-Type: application/json" -d '{"newFilename": "image0.png"}' http://localhost:4000/file/6a3ad6bba5538c76672bc741
echo "file successfully renamed!"

# delete file
curl -X DELETE -v --cookie "uid=6a396dd46fdf6557354f7fb2" http://localhost:4000/file/6a3ad6bba5538c76672bc741
echo "file successfully deleted!"