import data from './data.json' assert {type: 'json'};

let sorted = [];
let currentsTag = [];

function loadData(data, sorted) {

    const main = document.getElementsByTagName('main')[0];
    main.innerHTML = '';

    for (let i = 0; i < data.length; i++) {

        if (sorted.indexOf(data[i].id) == -1) {

            let element = document.createElement('div');
            element.id = data[i].id;
            element.classList.add('element');

            let left = document.createElement('div');
            left.classList.add('left');
            element.appendChild(left);

            let logo = document.createElement('button');
            logo.classList.add('logo');
            left.appendChild(logo);

            let image = document.createElement('img');
            image.src = data[i].logo;
            logo.appendChild(image);

            let info = document.createElement('div');
            info.classList.add('informations');
            left.appendChild(info);

            let infoheader = document.createElement('div');
            infoheader.classList.add("informationHeader");
            info.appendChild(infoheader);
            let brand = document.createElement('span');
            brand.classList.add('brand');
            brand.innerHTML = data[i].company;
            infoheader.appendChild(brand);

            if (data[i].new) {
                let newBtn = document.createElement('span');
                newBtn.classList.add('new');
                newBtn.classList.add('btn');
                newBtn.innerHTML = 'NEW!';
                infoheader.appendChild(newBtn);
            }
            if (data[i].featured) {
                let featured = document.createElement('span');
                featured.classList.add('featured');
                featured.classList.add('btn');
                featured.innerHTML = "FEATURED";
                infoheader.appendChild(featured);
            }

            let h1 = document.createElement('h1');
            h1.innerHTML = data[i].position;
            info.appendChild(h1);

            let infoDate = document.createElement('div');
            infoDate.classList.add('informationsDate');
            info.appendChild(infoDate);

            let date = document.createElement('span');
            date.classList.add('informationsDateElement');
            date.classList.add('date');
            date.innerHTML = data[i].postedAt;
            infoDate.appendChild(date);

            let timeType = document.createElement('span');
            timeType.classList.add('informationsDateElement');
            timeType.classList.add('timeType');
            timeType.innerHTML = data[i].contract;
            infoDate.appendChild(timeType);

            let location = document.createElement('span');
            location.classList.add('informationsDateElement');
            location.classList.add('location');
            location.innerHTML = data[i].location;
            infoDate.appendChild(location);



            let right = document.createElement('div');
            right.classList.add('right');
            element.appendChild(right);

            let role = document.createElement('button');
            role.classList.add('tag');
            role.innerHTML = data[i].role;
            role.dataset.tag = data[i].role;
            right.appendChild(role);

            let level = document.createElement('button');
            level.classList.add('tag');
            level.innerHTML = data[i].level;
            level.dataset.tag = data[i].level;
            right.appendChild(level);

            if (data[i].languages.length > 0) {
                for (let j = 0; j < data[i].languages.length; j++) {
                    let language = document.createElement('button');
                    language.classList.add('tag');
                    language.innerHTML = data[i].languages[j];
                    language.dataset.tag = data[i].languages[j];
                    right.appendChild(language);
                }
            }

            if (data[i].tools.length > 0) {
                for (let j = 0; j < data[i].tools.length; j++) {
                    let tool = document.createElement('button');
                    tool.classList.add('tag');
                    tool.innerHTML = data[i].tools[j];
                    tool.dataset.tag = data[i].tools[j];
                    right.appendChild(tool);
                }
            }

            main.appendChild(element);
        }


    }

    act();

}

loadData(data, sorted);

function act() {

    const nav = document.getElementsByTagName('nav')[0];
    const tags = document.getElementById('tags');
    let tag = document.getElementsByClassName('tag');

    for (let i = 0; i < tag.length; i++) {

        let tagi = tag[i];

        tagi.addEventListener('click', () => {

            let close = document.getElementsByClassName('close');
            let clear = document.getElementById('clear');

            if (currentsTag.indexOf(tagi.dataset.tag) == -1) {
                currentsTag.push(tagi.dataset.tag);
            }
            nav.style.display = 'flex';


            function fillFilter() {
                tags.innerHTML = '';
                for (let k = 0; k < currentsTag.length; k++) {
                    let tagsBtn = document.createElement('button');
                    tagsBtn.classList.add('tagsBtn');
                    tagsBtn.innerHTML = `<span>${currentsTag[k]}</span><button class='close' data-tag="${currentsTag[k]}"><img src="./assets/icon-remove.svg" alt=""></button>`
                    tags.appendChild(tagsBtn);
                    close = document.getElementsByClassName('close');
                }
            }
            fillFilter();

            for (let l = 0; l < data.length; l++) {

                let elmt = {
                    0: data[l].role,
                    1: data[l].level,
                    2: data[l].languages,
                    3: data[l].tools
                }

                if (Object.values(elmt).indexOf(tagi.dataset.tag) == -1 && elmt[2].indexOf(tagi.dataset.tag) == -1 && elmt[3].indexOf(tagi.dataset.tag) == -1 && sorted.indexOf(data[l].id) == -1) {
                    sorted.push(data[l].id);
                }
            }

            loadData(data, sorted);


            for (let m = 0; m < close.length; m++) {
                close[m].addEventListener('click', () => {
                    close[m].parentNode.style.display = 'none';
                    currentsTag.splice(currentsTag.indexOf(close[m].dataset.tag), 1);
                    if (currentsTag.length < 1) {
                        nav.style.display = 'none';
                    }

                    sorted = [];

                    for (let n = 0; n < data.length; n++) {
                        let elmt = {
                            0: data[n].role,
                            1: data[n].level,
                            2: data[n].languages,
                            3: data[n].tools
                        }
                        for (let o = 0; o < currentsTag.length; o++) {
                            if (Object.values(elmt).indexOf(currentsTag[o]) == -1 && elmt[2].indexOf(currentsTag[o]) == -1 && elmt[3].indexOf(currentsTag[o]) == -1 && sorted.indexOf(data[n].id) == -1) {
                                sorted.push(data[n].id);
                            }
                        }
                    }

                    loadData(data, sorted);

                })
            }

            clear.addEventListener('click', () => {
                currentsTag = [];
                nav.style.display = 'none';
                sorted = [];
                loadData(data, sorted);
            })


        })

    }
}