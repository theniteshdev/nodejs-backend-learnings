import fs from "node:fs/promises";

const buffer = await fs.readFile("./practice.txt")
// console.log(buffer);
/*
inside practice file
apple🌈
*/
function bufferToString(buffer) {
    return buffer.reduce((acc, curr) => {
        console.log(curr.length)
        return acc += String.fromCodePoint(curr);
    }, "");
};


function decodeUTF8(buffer) {
    let result = "";
    let i = 0;

    while (i < buffer.length) {
        let byte1 = buffer[i];

        // 1-byte character (ASCII)
        if (byte1 <= 0x7F) {
            result += String.fromCodePoint(byte1);
            i++;
        }

        // 2-byte character
        else if ((byte1 & 0xE0) === 0xC0) {
            let byte2 = buffer[i + 1];

            let codePoint =
                ((byte1 & 0x1F) << 6) |
                (byte2 & 0x3F);

            result += String.fromCodePoint(codePoint);
            i += 2;
        }

        // 3-byte character
        else if ((byte1 & 0xF0) === 0xE0) {
            let byte2 = buffer[i + 1];
            let byte3 = buffer[i + 2];

            let codePoint =
                ((byte1 & 0x0F) << 12) |
                ((byte2 & 0x3F) << 6) |
                (byte3 & 0x3F);

            result += String.fromCodePoint(codePoint);
            i += 3;
        }

        // 4-byte character
        else if ((byte1 & 0xF8) === 0xF0) {
            let byte2 = buffer[i + 1];
            let byte3 = buffer[i + 2];
            let byte4 = buffer[i + 3];

            let codePoint =
                ((byte1 & 0x07) << 18) |
                ((byte2 & 0x3F) << 12) |
                ((byte3 & 0x3F) << 6) |
                (byte4 & 0x3F);

            result += String.fromCodePoint(codePoint);
            i += 4;
        }

        else {
            throw new Error("Invalid UTF-8 sequence");
        }
    }

    return result;
}

let chatGPTFun = decodeUTF8(buffer);
let myFunc = bufferToString(buffer);

console.log(chatGPTFun)

console.log(myFunc)
