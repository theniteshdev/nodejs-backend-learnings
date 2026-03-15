const inputFile = document.querySelector("#input-file");
const output = document.querySelector(".file-output");
inputFile.addEventListener("change", function (events) {
    const file = events.target.files[0];
    const fileReader = new FileReader();
    // fileReader.readAsText(file);
    fileReader.readAsArrayBuffer(file)
    fileReader.onload = function (event) {
        console.log(event.target.result)
        output.textContent = event.target.result;
    }

})