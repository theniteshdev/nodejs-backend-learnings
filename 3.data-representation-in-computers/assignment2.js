// digits to hexadecimal number

function digitToHexa(digits = [], radix = 16) {
    const pureDigits = digits.map((digit, index) => {
        switch (digit) {
            case "a" || "A":
                return 10;
                break;
            case "b" || "B":
                return 11;
                break;
            case "c" || "C":
                return 12;
                break;
            case "d" || "D":
                return 13;
                break;
            case "e" || "E":
                return 14;
            case "f" || "F":
                return 15;
            default:
                return digit;
        };
    });

    return pureDigits.reduce((acc, curr, index) => acc + (curr * (radix ** index)), 0);
};

console.log(digitToHexa(["f", 0, 9, "f", 8, "c", 8, 8]));