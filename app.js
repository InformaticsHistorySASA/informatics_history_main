

// 스크롤 이벤트 리스너를 추가
window.addEventListener('scroll', handleScroll);

// 페이지 로드 시 애니메이션 체크
window.onload = function () {
    loadAll();
    handleScroll();  // 로딩이 완료되면 처음 한 번 실행
    helpbutton = document.getElementsByClassName('help-button')[0];
    info = document.getElementsByClassName('info')[0];
    overlay = document.getElementsByClassName('overlay')[0];
    menubutton = document.getElementsByClassName('menubutton');
    is_info_visible = false
    const minorMenuButton = document.querySelector('.minormenu');
    const menuContainer = document.querySelector('.menu-container');
    let isMenuOpen = false;

    // minorMenuButton.addEventListener('click', function (event) {
    //     event.preventDefault();
    //     if (isMenuOpen) {
    //         menuContainer.classList.remove('open');
    //     } else {
    //         menuContainer.classList.add('open');
    //     }
    //     isMenuOpen = !isMenuOpen;
    // });


    major_field = "";
    minor_field = "";
    console.log(menubutton)
    for (let i = 0; i < menubutton.length; i++) {
        menubutton[i].addEventListener('click', function () {
            // 클릭된 요소에 대한 동작을 정의
            minor_field="";
            if(menubutton[i].textContent=="HOME") major_field="";
            else major_field=menubutton[i].textContent;
            console.log(major_field,minor_field);
            loadAll();
        });
    }
};



// 스크롤 이벤트 리스너 함수 정의
function handleScroll() {
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        const rect = container.getBoundingClientRect();

        // 요소가 뷰포트 안에 들어왔을 때
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            container.classList.add('show');
        } else {
            container.classList.remove('show');
        }
    });

}


// 팝업 관련 코드


document.addEventListener('click', function (event) {
    console.log(overlay);
    if (!info.contains(event.target) && is_info_visible == true) { //안보이게하기
        is_info_visible = false;
        console.log("else");
        info.classList.remove("visible");
        overlay.classList.remove("visible");
    }
    else if (helpbutton.contains(event.target) && is_info_visible == false) {
        is_info_visible = true;
        console.log("hov");
        info.classList.add("visible");
        overlay.classList.add("visible");
    }

});

function removeAllGeneratedContent() {
    // 'generated-content' 클래스를 가진 모든 요소를 선택
    const generatedElements = document.querySelectorAll('.generated-content');
    
    // 각 요소를 순회하면서 부모 요소에서 제거
    generatedElements.forEach(element => {
        element.remove();
    });
}

function loadAll() {
    console.log("loadedall");
    removeAllGeneratedContent();
    fetch('contentData.json')
        .then(response => response.json())  // JSON 파일을 파싱
        .then(data => {
            const timeline = document.querySelector('.timeline'); // 타임라인 컨테이너
            function Filter(item) {
                if (minor_field == "") {
                    if (major_field == "") {
                        return true;
                    }
                    return item.major_field == major_field;
                }
                return item.minor_field in minor_field;
            }

            const filteredData = data.filter(Filter);
            filteredData.forEach((item, index) => {
                // 왼쪽 또는 오른쪽 컨테이너 설정
                const sideClass = index % 2 === 0 ? 'left' : 'right';

                // HTML 요소 생성
                const containerDiv = document.createElement('div');
                containerDiv.classList.add('container', sideClass,'generated-content');

                const anchor = document.createElement('a');
                anchor.classList.add('content');
                anchor.href = item.link;

                const h2 = document.createElement('h2');
                h2.textContent = item.year;

                const summaryDiv = document.createElement('div');
                summaryDiv.classList.add('summary');

                const p = document.createElement('p');
                p.textContent = item.text;

                const img = document.createElement('img');
                img.src = item.image;
                img.alt = `Image for year ${item.year}`;

                // 요소 조립
                summaryDiv.appendChild(p);
                summaryDiv.appendChild(img);
                anchor.appendChild(h2);
                anchor.appendChild(summaryDiv);
                containerDiv.appendChild(anchor);

                // 타임라인에 추가
                timeline.appendChild(containerDiv);
            });

            // 데이터가 추가된 후 스크롤 이벤트 다시 확인
            handleScroll();  // 처음 로딩 시 추가된 콘텐츠에 대해 한 번 실행
        })
        .catch(error => console.error('Error loading JSON:', error)); // 오류 처리
}