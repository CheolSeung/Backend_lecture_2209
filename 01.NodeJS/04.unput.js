const readline = require('readline');
const r1 = readline.createInterface({
    input: process.stdin,       // standard input, terminal(keyboard)
    output: process.stdout      // standard output, terminal(monitor)
});
r1.setPrompt('숫자를 입력하세요.> ');
r1.prompt();

// I/O(input, 파일 읽기/쓰기, 데이터 통신 등) 작업은 콜백 함수에서 처리
r1.on('line', buf => {          // 엔터 키를 눌렀을 때 발생
    let num = parseInt(buf);
    let evenOdd = (num % 2 == 0) ? '짝수' : '홀수';
    console.log(`입력한 숫자는 ${num}이고 ${evenOdd}입니다.`);

    r1.close()    // 끝낼 때 반드시 처리해야 함
});