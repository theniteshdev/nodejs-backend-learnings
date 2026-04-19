const res = await fetch('http://127.1.4.0:4000');
// console.log(res.headers.keys()); // this is iterable
// console.log(res.headers.values()); // this is iterable


res.headers.forEach((val, key) => {
    console.log(`${key}:${val}`)
});