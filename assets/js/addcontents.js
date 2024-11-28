let allPosts = []; // 전체 데이터를 저장할 변수

document.addEventListener('DOMContentLoaded', () => {
    fetch('posts/postmetadata.json')
    .then(response => response.json())
        .then(data => {
            allPosts = data.sort((a, b) => a.year - b.year); // JSON 데이터 정렬 후 저장
            const urlParams = new URLSearchParams(window.location.search);
            const query = urlParams.get('query') || ''; // 쿼리 스트링에서 검색어 가져오기
            if (query) {
                performSearch(query); // 검색어가 있으면 검색 수행
            } else {
                displayPosts(allPosts); // 검색어가 없으면 모든 데이터 표시
            }
        })
        .catch(error => console.error('Error loading JSON data:', error));
});

// 게시글을 표시하는 함수
function displayPosts(posts) {
    const main = document.getElementById('main');
    main.innerHTML = ''; // 이전 게시물 제거

    posts.forEach(item => {
        const article = document.createElement('article');
        article.classList.add('post');

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('title');

        const h2 = document.createElement('h2');
        const link = document.createElement('a');
        link.href = item.link;
        link.textContent = item.year;
        h2.appendChild(link);

        const p = document.createElement('p');
        p.textContent = item.text;

        titleDiv.appendChild(h2);
        titleDiv.appendChild(p);
        article.appendChild(titleDiv);
        main.appendChild(article);
    });
}

// 검색 수행 함수
function performSearch(query) {
    const filteredPosts = allPosts.filter(item => {
        return item.year.toLowerCase().includes(query.toLowerCase()) ||
               item.text.toLowerCase().includes(query.toLowerCase()) ||
               (item.tag && item.tag.toLowerCase().includes(query.toLowerCase())); // tag 속성 추가
    });
    displayPosts(filteredPosts); // 필터링된 결과 표시
}
