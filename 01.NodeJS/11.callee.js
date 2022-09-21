// 호출되는 프로그램(라이브러리)
exports.randInt = function(from, to) {
    return Math.ceil(Math.random() * (to-from+1) + from);
}

exports.circleArea = radius => Math.PI * radius * radius;