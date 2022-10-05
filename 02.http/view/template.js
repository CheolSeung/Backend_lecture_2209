module.exports = {
    HOME_CONTENTS:
        `월드 와이드 웹(World Wide Web)이란 
        인터넷에 연결된 사용자들이 서로의 정보를 공유할 수 있는 공간을 의미합니다.
        간단히 줄여서 WWW나 W3라고도 부르며, 간단히 웹(Web)이라고 가장 많이 불립니다.
        `,
    listGen:    function(files) {
        let list = '';
        for (let file of files) {
            const title = file.substring(0, file.length-4);     // .txt를 제외한 나머지
            list += `<li><h3><a href="/?id=${title}">${title}</a></h3></li>`;
        }
        return list;
    },
    buttonGen:  function(title) {
        if (title === undefined) {        // 홈 화면, 생성만 가능
            return `
            <button onclick="location.href='/create'">생성</button>
            <button disabled="disabled">수정</button>
            <button disabled="disabled">삭제</button>
            `;
        } else {                          // 조회 화면, 생성/수정/삭제 가능
            return `
            <button onclick="location.href='/create'">생성</button>
            <button onclick="location.href='/update?id=${title}'">수정</button>
            <button onclick="location.href='/delete?id=${title}'">삭제</button>
            `;
        }
    },
    createForm: function() {
        return `
            <form action="/create" method="post">
                <table>
                    <tr>
                        <td>제목</td>
                        <td><input type="text" name="title"></td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td><textarea name="content" cols="60" rows="5"></textarea></td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align: center;"><input type="submit" value="생성"></td>
                    </tr>
                </table>
            </form>
        `;
    },
    updateForm: function(title, content) {
        return `
            <form action="/update" method="post">
                <input type="hidden" name="original" value="${title}">
                <table>
                    <tr>
                        <td>제목</td>
                        <td><input type="text" name="title" value="${title}"></td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td><textarea name="content" cols="60" rows="5">${content}</textarea></td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align: center;"><input type="submit" value="수정"></td>
                    </tr>
                </table>
            </form>
        `;
    },
    deleteForm: function(title) {
        return `
            ${title} 글을 삭제하시겠습니까?<br>
            <button onclick="location.href='/deleteConfirm?id=${title}'">삭제</button>
            <button onclick="location.href='/?id=${title}'">취소</button>
        `;
    }
}