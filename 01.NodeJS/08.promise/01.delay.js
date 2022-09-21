// Promise
// Producer
function delayP(ms) {
    return new Promise((resolve, reject) => {     // resolve: 성공했을 때 실행되는 callback 함수
        try {
            setTimeout(() => {
                resolve('성공');
            }, ms);
        } catch(e) {
            reject('실패');      // reject: 실패했을 때 실행되는 callback 함수
        }
    });
}

// Consumer
delayP(1000)
    // .then((val) => {
    //     console.log(val);   
    // })
    .then(console.log)
    .catch(console.log);