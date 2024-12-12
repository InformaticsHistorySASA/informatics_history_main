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
        thumbnail.src = `${data.thumbnail}`;
        if('content' in data) content.innerHTML = data.content;
        else content.innerHTML = `<iframe id="only-iframe" src=\"./posts/${postId}.html\" />`;

        const iframe = document.getElementById("only-iframe");

        iframe.onload = function() {
            try {
                const iframeContentHeight = iframe.contentWindow.document.body.scrollHeight + 100;
                iframe.style.height = iframeContentHeight + "px";
            } catch (error) {
                console.error("Cross-origin access issue:", error);
            }
        };  
    }
    fetch(`./posts/${postId}.json`)
        .then(response => response.json())  // JSON 파일을 파싱
        .then(handleData)
        .catch(error => {
            console.error('Error loading JSON:', error);
            redirect = document.createElement('a');
            redirect.href = "./timeline.html";
            redirect.click();
        }); // 오류 처리
}
else{
    redirect = document.createElement('a');
    redirect.href = "./";
    redirect.click();
}
