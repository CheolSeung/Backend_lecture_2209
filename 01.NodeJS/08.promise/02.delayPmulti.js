function delayP(index, ms) {
    return new Promise((resovle, reject) => {
        setTimeout(() => {
            resovle(index + '성공');
        }, ms);
    });
}

delayP(1, 1000)
    .then(value => {
        console.log(value);
        return delayP(2, 1000);
    })
    .then(value => {
        console.log(value);
        return delayP(3, 1000);
    })
    .then(console.log);