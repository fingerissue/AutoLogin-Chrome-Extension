// 사용자 정보
import user from "./user_example.json";

const userid = user.userid;  // user_example.json 파일을 수정하세요.
const password = user.password;  // user_example.json 파일을 수정하세요.

// 알림창이 뜨면 자동으로 확인 버튼을 클릭한 것처럼 처리 (알림을 닫음)
window.alert = function(message) {
    console.log("Alert detected: ", message);
};

// 로그인 페이지에서 자동 로그인 수행
if (window.location.href.includes("cloud.inha.ac.kr")) {
    // 알림이 생성된 후 처리하기 위해 MutationObserver 사용
    const observer = new MutationObserver((mutationsList, observer) => {
        // 아이디 입력란 찾기
        const idField = document.querySelector("input[id='username']");
        if (idField) {
            idField.setAttribute("autocomplete", "username");
            idField.value = userid;
            idField.dispatchEvent(new Event('input', { bubbles: true }));
        }

        // 비밀번호 입력란 찾기
        const passwordField = document.querySelector("input[id='password']");
        if (passwordField) {
            passwordField.value = password;
            passwordField.dispatchEvent(new Event('input', { bubbles: true }));
        }

        // 로그인 버튼 찾기
        const loginButton = document.querySelector("button[id='submit']");
        if (loginButton) {
            loginButton.click();
        }

        observer.disconnect();  // MutationObserver 종료
    });

    observer.observe(document.body, { childList: true, subtree: true });
}
