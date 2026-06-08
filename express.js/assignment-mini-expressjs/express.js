import http from "node:http";
import fs from "node:fs/promises";
import mime from "mime-types";

// in this object i have saved all the paths which are registed with their handler function, method, extra agruments
const RegistedPathsHandlers = [];

// this is an intrestingeee😍 and main part of this mini expressjs framework
const Express = () => {
  return {
    Get: CreateHttpMethodFunction("GET"),
    Post: CreateHttpMethodFunction("POST"),
    Put: CreateHttpMethodFunction("PUT"),
    Patch: CreateHttpMethodFunction("PATCH"),
    Delete: CreateHttpMethodFunction("DELETE"),
    Listen: function (
      PORT,
      HOSTNAME = undefined,
      BACKLOG = undefined
    ) {
      // preparing handler function for passing into pure http(node:http) server
      const handlerFunction = PrepareHandlerFunction();
      const server = http.createServer(handlerFunction);

      // add listener for the server
      server.listen(Number(PORT) || 8080, HOSTNAME, BACKLOG, function () {
        console.log(`Server up at http://${HOSTNAME}:${PORT}`);
      });
    },
  };
};

function PrepareHandlerFunction() {
  return function (req, res) {
    res.setHeader("X-Developed-By", "nitesh-dev");
    const isPathFound = RegistedPathsHandlers.map((path) => {
      // setting methods to the res
      res.send = (msg) => {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        const byteLength = Buffer.byteLength(msg, "utf-8");
        res.setHeader("Content-Length", byteLength);
        res.write(msg);
        // here no need of calling end method because its automatically stop stream when the content-length is matched with data length
      };

      res.sendFile = async (filePath) => {
        const fileHandle = await fs.open(filePath);
        res.setHeader("Content-Length", (await fileHandle.stat()).size);
        res.setHeader("Content-Type", mime.lookup(filePath) || "unknown");
        const readStream = fileHandle.createReadStream();
        readStream.pipe(res);
      };

      if (req.method === path.method && req.url === path.path) {
        path.handler(req, res);
      }
    });
  };
}

function CreateHttpMethodFunction(httpMethod) {
  return function (path, handler) {
    RegistedPathsHandlers.push({
      path,
      handler,
      method: httpMethod,
    });
  };
}

export default Express;
