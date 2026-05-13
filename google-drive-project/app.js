import http from 'node:http'
import fs from 'node:fs/promises'
import mime from "mime-types"
import { createWriteStream, renameSync } from 'node:fs';

const PORT = 80;
const HOST = '::';
const server = http.createServer(listenToServer);

server.listen(PORT, HOST, (err) => {
    if (err) {
        console.log("Something went wrong !!")
        process.exit(1);
    }

    console.log(`Server Up: http://${HOST}:${PORT}`)
});


async function listenToServer(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');

    const { url } = req;
    console.log(`URL:::${url} ||| METHOD:::${req.method}`);
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
    if (url == "/" && req.method == "GET") {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200, "OK");
        const fileList = await fs.readdir("./store", { withFileTypes: true });
        const filteredFIleList = [];
        for (const file of fileList) {
            let isDirectory = file.isDirectory();
            if (isDirectory) {
                let recursiveFiles = [];
                let completeURL = `${file.parentPath}/${file.name}`
                console.log(completeURL);
                const fileListRecursive = await fs.readdir(completeURL);
                for (const recFname of fileListRecursive) {
                    recursiveFiles.push(recFname);
                };
                filteredFIleList.push({
                    dirName: completeURL,
                    files: [...recursiveFiles]
                });
            } else {
                filteredFIleList.push(file.name);
            }
        }

        res.write(JSON.stringify(filteredFIleList));
        res.end();


        // let dynamicHTMLFileList = "";
        //     for (const fname of fileList) {
        //         if (fname.isDirectory()) {
        //             let completeDirURL = `./store/${fname.name}`;
        //             let recursiveHTMLList = "";
        //             let recursiveFileList = await fs.readdir(completeDirURL);
        //             recursiveFileList.forEach((rname) => {
        //                 recursiveHTMLList += `<li>
        //             <a>
        //             ${rname}
        //             </a>
        //             |
        //             <a href="${completeDirURL}/${rname}?action=download">Download</a>
        //             |
        //             <a href="${completeDirURL}/${rname}?action=preview">Preview</a>
        //             </li>\n`;
        //             });
        //             dynamicHTMLFileList += `
        //             <li>
        //                 <p>Directory: ${completeDirURL}</p>
        //                 <ul>
        //                     ${recursiveHTMLList}
        //                 </ul>
        //             </li>
        //         `;
        //         } else {
        //             dynamicHTMLFileList += `<li>
        //         <a>
        //         ${fname.name}
        //         </a>
        //         |
        //         <a href="./store/${fname.name}?action=download">Download</a>
        //         |
        //         <a href="./store/${fname.name}?action=preview">Preview</a>
        //         </li>`
        //         }
        //     }
        //     res.write(`
        //     <!DOCTYPE html>
        //     <html>
        //     <head>
        //     <title>File Store</title>
        //     </head>
        //     <body>
        //     <h2 class="app-name">My Files</h2>

        //     <div className="file-container">
        //     <ul>
        // ${dynamicHTMLFileList}
        //     </ul>
        //     </div>
        //     </body>
        //     </html>

        //     `)
    } else if (url == "/" && req.method == "POST") {
        const writeStream = createWriteStream(`./store/${req.headers.filename}`);
        req.pipe(writeStream);
        let count = 0;
        req.on("data", (chunk) => {
            count++;
        });
        req.on("end", () => {
            res.write(`${count}`);
            res.end("File Successfully Uploaded!");
        });
    }
    else if (url == "/favicon.ico" || url.startsWith("/store/")) {
        try {
            let params = extractParameters(url);
            const open = await fs.open(`.${params.rootUrl.replaceAll("%20", " ")}`);

            if (mime.lookup(`.${params.rootUrl}`) == "text/plain") {
                res.setHeader("Content-Type", `${mime.lookup(`.${params.rootUrl}`)}; charset=utf-8`);
            }
            res.setHeader("Content-Length", (await open.stat()).size);


            if (params.action) {
                if (params.action == "download") {
                    let letPath = String(params.rootUrl)?.split("/");
                    res.setHeader("Content-Disposition", `attachment; filename=${letPath[letPath.length - 1].replaceAll("%20", "_") || 'file'}`)
                };
            };

            const readStream = open.createReadStream();
            readStream.pipe(res);
        } catch (error) {
            console.log(`Error: ${error.message}`);
            res.end("Not Found");
        }
    } else if (url == "/rename" && req.method == "PUT") {

        let newFileNameExtract = req.headers["newfilename"];
        let oldFleNameExtract = req.headers["oldfilename"];
        try {
            res.statusCode = 201;
            await renameSync(oldFleNameExtract, newFileNameExtract);
            res.end("Successfully file renamed.")
        } catch (error) {
            console.log(error)
            res.statusCode = 500;
            res.end("Failed to rename file !");
        }
    } else if (url == "/delete" && req.method == "DELETE") {
        console.log(req.headers.filename)
        if (!req.headers.filename) {
            res.statusCode = 400;
            res.end("File Name Not Found");
        }
        try {
            await fs.unlink(req.headers.filename);
            res.end(`File: ${req.headers.filename} Successfully Deleted from SERVER`);
        } catch (error) {
            res.statusCode = 500;
            res.end("Internal Server Error !");
        };
    }
    else {
        res.statusCode = 404;
        res.write("<a href='/'>Go to Store</a> <br>")
        res.end("404 | Not Found");
    }
};
function extractParameters(completeURL) {
    let [rootUrl, rawParam] = completeURL?.split("?", 20);
    const filteredParam = {};
    (rawParam?.split("&")?.forEach((fullParam) => {
        const [key, val] = fullParam.split("=")
        filteredParam[key] = val;
    }));
    return { ...filteredParam, rootUrl } || false;
};