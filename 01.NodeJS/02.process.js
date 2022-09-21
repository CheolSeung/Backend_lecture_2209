console.log('process.env:', process.env);  // 환경 설정
console.clear();
console.log(process.env.COMPUTERNAME);

console.log('process.version:', process.version);   // NodeJS version
console.log('process.arch:', process.arch);
console.log('process.platform:', process.platform);
console.log('process.argv:', process.argv);

process.exit(0);    // 정상 종료, 코드값이 -1은 비정상 종료

console.log('프로세스');   // unreachable

// Hoisting - 함수와 변수 선언을 프로그램의 제일 위로 올리는 것
function aa() {
    let a = 2;
    return a;
    let b = 3;     // unreachable
}
var a = 5;