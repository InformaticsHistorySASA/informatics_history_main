const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
});

// 페이지 로드 시 애니메이션 체크
window.onload = function () {
    loadAll();
    // handleScroll();  // 로딩이 완료되면 처음 한 번 실행
    helpbutton = document.getElementsByClassName('help-button')[0];
    info = document.getElementsByClassName('info')[0];
    // overlay = document.getElementsByClassName('overlay')[0];
    menubutton = document.getElementsByClassName('menubutton');
    is_info_visible = false
    const minorMenuButton = document.querySelector('.minormenu');
    const menuContainer = document.querySelector('.menu-container');
    let isMenuOpen = false;

}
let timeline_data = null;
let rendered_data = null;

function removeAllGeneratedContent() {
    // 'generated-content' 클래스를 가진 모든 요소를 선택
    const generatedElements = document.querySelectorAll('.generated-content');
    
    // 각 요소를 순회하면서 부모 요소에서 제거
    generatedElements.forEach(element => {
        element.remove();
    });
}

to_css_class_name = field_name => {
    if(field_name == "NETWORK & SECURITY") return "NETWORK-SECURITY";
    if(field_name == "DATA & AI") return "DATA-AI";
    return field_name;
}
year_handler = num => {
    if(parseInt(num) < 0) return `BC ${-parseInt(num)}`;
    return num;
}
year_cut = year => {
    const ret = document.createElement('div');
    ret.classList.add('year-cut', 'generated-content');
    
    const num = document.createElement('div');
    num.classList.add('num');
    num.innerHTML = year_handler(year);

    const dotLine = document.createElement('div');
    dotLine.classList.add('dot-line');

    ret.appendChild(num);
    ret.appendChild(dotLine);
    return ret;
}
const contentWidth = 300;
function renderTimeLine(data){
        // 기존 생성된 타임라인 정리
        removeAllGeneratedContent();

        // 타임라인에 데이터 렌더링
        const timeline = document.querySelector('.timeline');
        const oneLineCNT = Math.floor(window.innerWidth/(1.2*contentWidth));
        let crtLine = null, lineStartsAt = 0, sideClass = 'right';
        console.log(oneLineCNT);
        
        // 데이터 처리 및 DOM 생성
        data.forEach((item, index) => {
            if(!crtLine || parseInt(crtLine.getAttribute('data-year')) > parseInt(item.year) || parseInt(crtLine.getAttribute('data-year'))+10 <= parseInt(item.year) || index-lineStartsAt >= oneLineCNT){
                if(crtLine) {
                    const L = crtLine.childNodes;
                    L.forEach(containerDiv => {
                        containerDiv.style.width = `${100/L.length}%`;
                    })
                    timeline.appendChild(crtLine);
                    if(parseInt(crtLine.getAttribute('data-year'))+20 <= parseInt(item.year)){
                        timeline.appendChild(year_cut(parseInt(crtLine.getAttribute('data-year'))+10));
                    }
                    if(parseInt(crtLine.getAttribute('data-year'))+10 <= parseInt(item.year)){
                        timeline.appendChild(year_cut(Math.floor(item.year/10)*10));
                    }
                    if(parseInt(crtLine.getAttribute('data-year')) > parseInt(item.year)){
                        timeline.appendChild(year_cut(crtLine.getAttribute('data-year')));
                    }
                }
                crtLine = document.createElement('div');
                crtLine.dataset.year = Math.floor(item.year/10)*10;
                crtLine.classList.add('event-line', 'generated-content');
                lineStartsAt = index;
                // console.log(`new line year:${crtLine.dataset.year}, `)
                if(sideClass=='left') sideClass='right';
                else sideClass='left';
            }
    
            // HTML 요소 생성
            const containerDiv = document.createElement('div');
            containerDiv.classList.add('container');
            // containerDiv.style.width = `${100/oneLineCNT}%`
    
            const anchor = document.createElement('a');
            anchor.classList.add('content', to_css_class_name(item.major_field));
            anchor.href = item.link;
            if(!item.link) anchor.addEventListener('click', e => {
                e.preventDefault();
            })
            // if(sideClass=='left') anchor.style.left = '20%';
            // else anchor.style.right = '20%';

            const img_block = document.createElement('div');
            img_block.classList.add('image-block');
    
            const img = document.createElement('img');
            img.src = `${item.image}`;
            img.alt = `Image for ${item.text}`;

            const p = document.createElement('p');
            p.textContent = `${year_handler(item.year)}, ${item.text}`;
    
            // 요소 조립
            img_block.appendChild(img);
            anchor.appendChild(img_block);
            anchor.appendChild(p);
            containerDiv.appendChild(anchor);
            crtLine.appendChild(containerDiv);
        });
        if(crtLine){
            timeline.appendChild(crtLine);
            const L = crtLine.childNodes;
            L.forEach(containerDiv => {
                containerDiv.style.width = `${100/L.length}%`;
            })
        }

        const hiddenBoxes = document.querySelectorAll('.container');
        hiddenBoxes.forEach(box => observer.observe(box));
        rendered_data = data;
}
document.addEventListener('resize', (event)=>{
    event.preventDefault();
    renderTimeLine(rendered_data);
})


function loadAll_real() {
    fetch('./contentData.json')
        .then(response => response.json())  // JSON 파일을 파싱
        .then(data => {
            // 데이터 정렬: year를 기준으로 오름차순 정렬
            data.sort((a, b) => parseInt(a.year) - parseInt(b.year));

            // 정렬된 데이터를 타임라인에 렌더링
            timeline_data = data;
            renderTimeLine(data);
        })
        .catch(error => console.error('Error loading JSON:', error)); // 오류 처리
}

const loadAll = loadAll_real;


let activated_major_fields = new Set(['HARDWARE', 'SOFTWARE', 'NETWORK & SECURITY', 'DATA & AI']), activated_minor_fields = new Set;
const majorButtons = document.querySelectorAll('.timeline-menu-button');
function field_selector(){
    if(activated_major_fields.size==0 && activated_minor_fields.size==0) return [{"year": 0, "text": "Nothing rendered", "image": "./user_files/turing.webp"}];
    // 필터링 조건 함수
    function Filter(item) {
        if(activated_major_fields.has(item.major_field)) return true;
        if(activated_minor_fields.has(item.minor_field)) return true;
        return false;
    }

    // 필터링된 데이터 추출
    const filtered_data = timeline_data.filter(Filter);

    return filtered_data;
}
majorButtons.forEach(button => {
    button.classList.add('active');
    button.addEventListener('click', function (event) {
        event.preventDefault();
        const major = button.getAttribute('data-box')
        if(!activated_major_fields.has(major)){
            button.classList.add('active');
            activated_major_fields.add(major);
            renderTimeLine(field_selector());
        }
        else{
            button.classList.remove('active');
            activated_major_fields.delete(major);
            renderTimeLine(field_selector());
        }
        window.scrollTo(0,0)
    });
})
majorButtons.forEach(button => {
    button.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const major = button.getAttribute('data-box')
        activated_major_fields.clear(); activated_major_fields.add(major);
        majorButtons.forEach(i => {
            if(i.classList.contains('active')) i.classList.remove('active');
        })
        button.classList.add('active');
        renderTimeLine(field_selector());
        window.scrollTo(0,0);
    });
})
const inverse_button = document.getElementById('timeline-inverse');
inverse_button.addEventListener('click', event => {
    event.preventDefault();
    timeline_data = timeline_data.toReversed();
    rendered_data = rendered_data.toReversed();
    renderTimeLine(rendered_data);
    console.log(typeof rendered_data);
});
