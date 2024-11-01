const urlSearch = new URLSearchParams(location.search);
if(urlSearch.has('id')){
    postId = urlSearch.get('id');
    function handleData(data){
        const tabtitle = document.getElementById('post-tabtitle');
        const title = document.getElementById('post-title');
        const subtitle = document.getElementById('post-subtitle');
        const author = document.getElementById('post-author');
        const date = document.getElementById('post-date');
        const thumbnail = document.getElementById('post-thumbnail');
        const content = document.getElementById('post-content');

        tabtitle.innerHTML = data.title;
        title.innerHTML = data.title;
        subtitle.innerHTML = data.subtitle;
        author.innerHTML = data.author;
        date.setAttribute('datetime', data.date);
        date.innerHTML = data.date;
        content.innerHTML = data.content;

        const iframes = document.getElementsByTagName("iframe");
        iframes.forEach(iframe => {iframe.onload = function () {
            iframe.setAttribute("scrolling", "no");
            // iframe의 내부 문서 높이 가져오기
            const iframeContentHeight = iframe.contentWindow.document.body.scrollHeight;
            // iframe의 높이를 내부 콘텐츠 높이에 맞추기
            iframe.style.height = iframeContentHeight + "px";
        };})
    }
    // handleData({
    //     "id" : "caesar",
    //     "title" : "카이사르 암호",
    //     "subtitle" : "카이사르 암호 복호화",
    //     "author" : "박제준",
    //     "date" : "2024-10-31",
    //     "content":"<iframe src=\"./heh.html\" />"
    // });
    fetch(`posts/${postId}.json`)
        .then(response => response.json())  // JSON 파일을 파싱
        .then(handleData)
        .catch(error => console.error('Error loading JSON:', error)); // 오류 처리
}
else{
    redirect = document.createElement('a');
    redirect.href = "./index.html";
    redirect.click();
}
