const a = new ArrayBuffer(4);
const view = new DataView(a);

view.setInt8(0, 80);
view.setInt8(1, 80);
view.setInt8(2, 80);
view.setInt8(3, 80);

console.log(view)
