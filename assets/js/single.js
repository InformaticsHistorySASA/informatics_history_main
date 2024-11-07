const urlSearch = new URLSearchParams(location.search);
if(urlSearch.has('id')){
    const postId = urlSearch.get('id');
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
        thumbnail.src = `../images/${data.thumbnail}`;
        content.innerHTML = `<iframe id="only-iframe" src=\"../posts/${postId}.html\" />`;

        const iframe = document.getElementById("only-iframe");
        iframe.onload = function() {
            const iframeContentHeight = iframe.contentWindow.document.body.scrollHeight;
            iframe.style.height = iframeContentHeight + "px";
        };
        iframe.setAttribute("scrolling", "no");
    }
    // handleData({
    //     "id" : "caesar",
    //     "title" : "카이사르 암호",
    //     "subtitle" : "카이사르 암호 복호화",
    //     "author" : "박제준",
    //     "date" : "2024-10-31",
    //     "content":"<iframe src=\"./heh.html\" />"
    // });
    fetch(`../posts/${postId}.json`)
        .then(response => response.json())  // JSON 파일을 파싱
        .then(handleData)
        .catch(error => console.error('Error loading JSON:', error)); // 오류 처리
}
else{
    redirect = document.createElement('a');
    redirect.href = "../";
    redirect.click();
}
