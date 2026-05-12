import http from 'node:http'
import fs from 'node:fs/promises'
import mime from "mime-types"

const PORT = 80;
const HOST = '127.1.11.1';
const server = http.createServer(listenToServer);

server.listen(PORT, HOST, (err) => {
    if (err) {
        console.log("Something went wrong !!")
        process.exit(1);
    }

    console.log(`Server Up: http://${HOST}:${PORT}`)
});


async function listenToServer(req, res) {
    const { url } = req;
    console.log(url);
    if (url == "/") {
        let dynamicHTMLFileList = "";
        const fileList = await fs.readdir("./store", { withFileTypes: true });
        for (const fname of fileList) {
            if (fname.isDirectory()) {
                let completeDirURL = `./store/${fname.name}`;
                let recursiveHTMLList = "";
                let recursiveFileList = await fs.readdir(completeDirURL);
                recursiveFileList.forEach((rname) => {
                    recursiveHTMLList += `<li>
                <a>
                ${rname}
                </a>
                |
                <a href="${completeDirURL}/${rname}?action=download">Download</a>
                |
                <a href="${completeDirURL}/${rname}?action=preview">Preview</a>
                </li>\n`;
                });
                dynamicHTMLFileList += `
                <li>
                    <p>Directory: ${completeDirURL}</p>
                    <ul>
                        ${recursiveHTMLList}
                    </ul>
                </li>
            `;
            } else {
                dynamicHTMLFileList += `<li>
            <a>
            ${fname.name}
            </a>
            |
            <a href="./store/${fname.name}?action=download">Download</a>
            |
            <a href="./store/${fname.name}?action=preview">Preview</a>
            </li>`
            }
        }
        res.write(`
        <!DOCTYPE html>
        <html>
        <head>
        <title>File Store</title>
        </head>
        <body>
        <h2 class="app-name">My Files</h2>

        <div className="file-container">
        <ul>
    ${dynamicHTMLFileList}
        </ul>
        </div>
        </body>
        </html>

        `)
        res.end()
    } else if (url.startsWith("/store") || url == "/favicon.ico") {
        try {
            let params = extractParameters(url);
            const open = await fs.open(`.${params.rootUrl.replaceAll("%20", " ")}`);

            if (mime.lookup(`.${params.rootUrl}`) == "text/plain") {
                res.setHeader("Content-Type", `${mime.lookup(`.${params.rootUrl}`)}; charset=utf-8`);
            }
            res.setHeader("Content-Length", (await open.stat()).size);


            if (params.action) {
                if (params.action == "download") {
                    let letPath = String(params.action.rootUrl)?.split("/");
                    res.setHeader("Content-Disposition", `attachment; filename=${letPath[letPath.length - 1] || 'file'}`)
                };
            };

            const readStream = open.createReadStream();
            readStream.pipe(res);
        } catch (error) {
            console.log(`Error: ${error.message}`);
            res.end("Not Found");
        }
    } else {
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