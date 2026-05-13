const input = document.querySelector("#file-uploader");
const fileListContainer = document.querySelector(".files-container");
const actualProgress = document.querySelector(".actual-progress");
const uploadingProgress = document.querySelector(".uploading-progress");
const serverURL = "http://[2401:4900:1c37:f86d:98e:21aa:2045:4745]/"

async function handleDelete(filename) {
    console.log(filename, "Deleted");
    const res = await fetch(`${serverURL}delete`, {
        method: "DELETE",
        headers: { filename }
    });
    console.log(await res.text());
    fetchFiles();
};

async function handleRenameFile(oldFileName) {
    let newFileName = prompt("Please enter new file name", [oldFileName]);
    console.log(oldFileName, "Renamed to", newFileName);
    const res = await fetch(`${serverURL}rename`, {
        method: "PUT",
        headers: { newFileName, oldFileName }
    });

    console.log(await res.text());
    fetchFiles();
};

input.addEventListener("change", async (events) => {
    // PROGRESS SHOWING USING FETCH NOT SUPPORTED
    // let res = await fetch("http://127.1.11.1/", {
    //     method: "POST",
    //     body: events.target.files[0],
    //     headers: {
    //         filename: events.target.files[0].name,
    //     }
    // });

    const xhr = new XMLHttpRequest();
    xhr.open("POST", serverURL, true);
    xhr.setRequestHeader("filename", events.target.files[0].name);
    xhr.upload.addEventListener("progress", (ev) => {
        let per = ((ev.loaded / ev.total) * 100).toFixed(2)
        actualProgress.innerHTML = per;
        if (per >= 50) {
            uploadingProgress.style.color = "green";
        } else if (per < 50) {
            uploadingProgress.style.color = "red";
        } else if (per == 100) {
            fetchFiles();
        }
    });

    xhr.send(events.target.files[0]);
}); // end of change event listner

async function fetchFiles() {
    const res = await fetch(serverURL, {
        method: "GET"
    }).then(res => res.json())
        .then(dirs => {
            let dynamicHTMLlist = "";
            Array.from(dirs).forEach(file => {
                if (typeof (file) == "object") {
                    let anotherDynamicHTML = "";
                    file.files.map(recname => {
                        anotherDynamicHTML += `<li class="nested-li">${recname}</li>
                    <button>
                    <a href="${serverURL}${file.dirName}/${recname}?action=preview">Preview</a>
                    </button>
                <button>
                <a href="${serverURL}${file.dirName}/${recname}?action=download">Download</a>
                </button>

                <button onclick='handleRenameFile("${file.dirName}/${recname}")'>Rename</button>
                <button onclick='handleDelete("${file.dirName}/${recname}")'>Delete</button>
            `
                    })

                    dynamicHTMLlist += `
                <p class="dir-name">Directory Name: ${file.dirName}</p>
                ${anotherDynamicHTML}
                </p>
                `
                } else if (typeof (file) == "string") {
                    dynamicHTMLlist += `
                <li class="regular-li">${file}</li>
                <button>
                <a href="${serverURL}store/${file}?action=preview">Preview</a>
                </button>
                <button>
                <a href="${serverURL}store/${file}?action=download">Download</a>
                </button>

                <button onclick='handleRenameFile("./store/${file}")'>Rename</button>
        <button onclick='handleDelete("./store/${file}")'>Delete</button>
                `
                }
            });

            fileListContainer.innerHTML = dynamicHTMLlist;
        }); // generate dynamic html done
}; // end of fetch files function

fetchFiles();