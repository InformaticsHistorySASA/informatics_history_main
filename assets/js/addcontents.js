document.addEventListener('DOMContentLoaded', () => {
    fetch('/posts/metaData.json')
        .then(response => response.json())
        .then(data => {
            const main = document.getElementById('main'); // 메인 컨테이너

            // 연도순으로 정렬 (오름차순)
            data.sort((a, b) => a.year - b.year);

            data.forEach(item => {
                // 요소 생성
                const article = document.createElement('article');
                article.classList.add('post');

                const titleDiv = document.createElement('div');
                titleDiv.classList.add('title');

                const h2 = document.createElement('h2');
                const link = document.createElement('a');
                link.href = item.link;
                link.textContent = item.year; // 연도를 제목으로 설정
                h2.appendChild(link);

                const p = document.createElement('p');
                p.textContent = item.text; // 텍스트 내용을 설정

                // 요소 조립
                titleDiv.appendChild(h2);
                titleDiv.appendChild(p);
                article.appendChild(titleDiv);
                main.appendChild(article);
            });
        })
        .catch(error => console.error('Error loading JSON data:', error));
});