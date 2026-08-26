const obj = {
    then(resolve) {
        setTimeout(() => {
            resolve("Resolved Called!")
        }, 2000)
    }
};

// obj.then((data) => console.log(data))
obj.then((data) => console.log(data))