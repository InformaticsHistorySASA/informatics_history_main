// 모든 .container 요소를 가져옴
const containers = document.querySelectorAll('.container');

// 스크롤 이벤트 리스너를 추가
window.addEventListener('scroll', () => {
    containers.forEach(container => {
        const rect = container.getBoundingClientRect();

        // 요소가 뷰포트 안에 들어왔을 때
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            container.classList.add('show');
        } else {
            // 요소가 뷰포트 밖으로 나갔을 때
            container.classList.remove('show');
        }
    });
});

window.onload=function(){
    containers.forEach(container => {
        const rect = container.getBoundingClientRect();

        // 요소가 뷰포트 안에 들어왔을 때
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            container.classList.add('show');
        } else {
            // 요소가 뷰포트 밖으로 나갔을 때
            container.classList.remove('show');
        }
    });
}