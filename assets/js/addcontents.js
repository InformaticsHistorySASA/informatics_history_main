let allPosts = []; // 전체 데이터를 저장할 변수

async function loadData() {
    const allPosts = [];

    // 첫 번째 데이터 로드
    const postsData = await fetch('./postsData.json').then(response => response.json());
    await Promise.all(
        postsData.map(item =>
            fetch(`./posts/${item}`)
                .then(response => response.json())
                .then(postdata => {
                    allPosts.push({
                        "year": postdata.title,
                        "text": postdata.subtitle,
                        "image": postdata.thumbnail,
                        "link": !postdata.link ? `./single.html?id=${postdata.id}` : postdata.link
                    });
                })
                .catch(error => console.error('Error loading post data:', error))
        )
    );

    // 두 번째 데이터 로드 및 정렬
    const contentData = await fetch('./contentData.json').then(response => response.json());
    allPosts.push(...contentData.sort((a, b) => a.year - b.year));

    return allPosts;
}

document.addEventListener('DOMContentLoaded', async () => {
    allPosts = await loadData();
    console.log(allPosts); // 데이터 확인

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query') || ''; // 쿼리 스트링에서 검색어 가져오기
    if (query) {
        performSearch(query); // 검색어가 있으면 검색 수행
    } else {
        if (allPosts.length > 0) {
            displayPosts(allPosts); // 검색어가 없으면 모든 데이터 표시
        } else {
            console.error('No posts to display');
        }
    }
});

function displayPosts(posts) {
    const main = document.getElementById('main');
    main.innerHTML = ''; // 이전 게시물 제거

    posts.forEach(item => {
        const article = document.createElement('article');
        article.classList.add('post');

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('title');
        const clickbox = document.createElement('a');

        clickbox.classList.add('content-clickbox');
        const h2 = document.createElement('h2');
        const link = document.createElement('a');

        clickbox.href = item.link;
        if (parseInt(item.year) && parseInt(item.year) < 0) {
            link.textContent = `BC ${-parseInt(item.year)}`;
        } else {
            link.textContent = item.year;
        }
        h2.appendChild(link);

        const p = document.createElement('p');
        p.textContent = item.text;
        article.appendChild(clickbox);
        clickbox.appendChild(titleDiv);
        titleDiv.appendChild(h2);
        titleDiv.appendChild(p);
        clickbox.appendChild(titleDiv);
        main.appendChild(article);
    });
}

function performSearch(query) {
    const filteredPosts = allPosts.filter(item => {
        return item.year.toLowerCase().includes(query.toLowerCase()) ||
               item.text.toLowerCase().includes(query.toLowerCase()) ||
               (item.major_field && item.major_field.toLowerCase().includes(query.toLowerCase())) ||
               (item.tag && item.tag.toLowerCase().includes(query.toLowerCase()));
    });
    displayPosts(filteredPosts); // 필터링된 결과 표시
}
