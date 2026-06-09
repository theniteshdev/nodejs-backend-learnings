const myBuffer = new ArrayBuffer(4); // buffer of 8 bytes

// creating view
const myDateView = new DataView(myBuffer);
myDateView.setInt8(0,);

console.log(myDateView.getInt8(0));