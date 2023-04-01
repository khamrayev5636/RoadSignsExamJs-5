// Box link vs Modal start
const elBox = document.querySelector(".box")
const elBoxLink = document.querySelector(".box__link");
const elBoxModal = document.querySelector(".modal__box");
const elModalBtn = document.querySelector(".modal__link");

// form select start

const elModal = document.querySelector(".modal__form");
const elSelectLevel = document.querySelector(".modal__level");
const elSelectTime = document.querySelector(".modal__time");

// Template start
const elServices = document.querySelector(".services")
const elCount = document.querySelector(".services__count");
const elScore = document.querySelector(".services__score");
const elAttemp = document.querySelector(".services__attemp")
const elTimer = document.querySelector(".services__timer");
const elTextTitle = document.querySelector(".services__title");
const elWrapper = document.querySelector(".services__wrapper");
const elItem = document.querySelector(".item")
const elList = document.querySelector(".list");

// GAME OVER 
const elGameOver = document.querySelector(".modal__gameover");
const elGameOverCount = document.querySelector(".gameover__count");
const elGameOverScore = document.querySelector(".gameover__score");

// You Win
const elWin = document.querySelector(".modal__win");
const elWinCount = document.querySelector(".win__count");
const elWinScore = document.querySelector(".win__score");
const elCheckMark = document.querySelector(".img__checkmark")


let count = 0;
let point = 0;
let attemp = 5;

// Box link vs Modal start

elBoxLink.addEventListener("click" ,() => {
    elBoxModal.classList.add("d-block");
    elBox.classList.add("d-none");
})

// Modal start (Ya'ni uyin boshlanadigan modal kartlar chiqishi)

elModalBtn.addEventListener("click" , ()=> {
    
    elBoxModal.classList.add("d-none");
    
    const selectLevel = elSelectLevel.value.trim();
    
    levelRoad(selectLevel);
    
    renderRoadTitle(roadTitle);
    renderRoadMain(roadTitle , elList);
    
    getTime()
    
    setTimeout(() => {
        elServices.classList.add("d-block");
        
    }, 1000);
    
})

// RenderMain function start (Asosiy function)

function renderRoadMain(arr , node) {
    
    elList.innerHTML = ""
    elTextTitle.style.backgroundColor = "trasparent"
    elWrapper.style.backgroundColor = "transparent"
    
    setTimeout(() => {
        
        elWrapper.style.backgroundColor = "#424040"
        elTextTitle.style.backgroundColor =  "#918e8e"
        
        const elFragment = document.createDocumentFragment()
        const elTemplate = document.querySelector(".services__template").content;
        
        arr.forEach(item => {
            
            const elClone = elTemplate.cloneNode(true);
            
            elClone.querySelector(".services__img").src = item.symbol_img;
            elClone.querySelector(".services__img").alt = item.symbol_title;
            elClone.querySelector(".services__img").dataset.title = item.symbol_title;
            
            elFragment.appendChild(elClone)
        })
        
        node.appendChild(elFragment);
        
    }, 1000);
    
}

// Gettime function (vaqt funksiyasi)

function getTime() {
    
    const selectTime = Number(elSelectTime.value.trim());
    
    let sumTime = selectTime * 60;
    
    const timer = setInterval(() => {
        
        let minut = Math.floor(sumTime / 60)
        let secund = Math.floor(sumTime % 60);
        
        if(minut < 10){
            minut = `0${minut}`
        }
        
        if(secund < 10) {
            secund = `0${secund}`
        }
        
        elTimer.textContent = `qoldi: ${minut}:${secund}`;
        sumTime--
        
        if((minut == 00 && secund == 00) || point == (-5)) {
            clearInterval(timer);
            gameOver()
        }
        
    }, 1000);
}


// GAME OVER FUNCTION

function gameOver() {
    elGameOver.classList.add("d-block");
    elServices.classList.add("d-none");
    
    elGameOverCount.textContent = `Urinishlar soni: ${count}`
    elGameOverScore.textContent = `Bali: ${point}`
}

// Win function (Yutgan haqida modal function)

function roadWin() {
    elWin.classList.add("d-block");
    elServices.classList.add("d-none");
    
    elWinCount.textContent = `Urinishlar soni: ${count}`
    elWinScore.textContent = `Bali: ${point}`
}

// LevelRoad function (easy , medium , hard)

const roadTitle = [];

let randomRoadEasy = Math.floor(Math.random() * 80)
let randomRoadMedium = Math.floor(Math.random() * 59)
let randomRoadHard = Math.floor(Math.random() * 38)

function levelRoad(level) {
    
    if(level == "easy") {
        const roadEasy = roadSymbol.splice(randomRoadEasy , 21);
        roadEasy.forEach(item => {
            roadTitle.push(item);
        })
    }
    
    if(level == "medium") {
        const roadMedium = roadSymbol.splice(randomRoadMedium , 42);
        roadMedium.forEach(item => {
            roadTitle.push(item);
        })
    }
    
    if(level == "hard") {
        const roadHard = roadSymbol.splice(randomRoadHard , 63);
        roadHard.forEach(item => {
            roadTitle.push(item);
        })
    }  
}

// Title Road Render

function renderRoadTitle (title) {
    setTimeout(() => {
        
        let random = Math.floor(Math.random() * title.length);
        elTextTitle.textContent = title[random].symbol_title;
        
    }, 1000);
    
}


// Event Delegation 

elList.addEventListener("click" , evt => {
    
    if(evt.target.matches(".services__img")){
        
        // Find orqali solishtirilgan
        
        const roadTitleDelete = evt.target.dataset.title;        
        const roadFind = roadTitle.find((item) => item.symbol_title == roadTitleDelete);
        // console.log(roadFind)
        
        ++count
        elCount.textContent = count
        
        // FindIndex orqali solishtirilgan
        
        if(roadFind.symbol_title == elTextTitle.textContent){
            const roadFindIndex = roadTitle.findIndex(item => item.symbol_title == roadTitleDelete)
            roadTitle.splice(roadFindIndex, 1);
            renderRoadTitle(roadTitle);
            
            // Orqa rangini bo'yash
            
            const itemBg = evt.target;
            itemBg.classList.add("img-js");
            let audio = new Audio ("./audios/audios.mp3");
            audio.play()
            setTimeout(() => {
                audio.pause()
            }, 1000);
            setTimeout(() => {
                const itemRemove = evt.target
                itemRemove.classList.add("item-js");
                itemBg.classList.remove("img-js")
            }, 1200);
            point += 2
            elScore.textContent = point;
            
            
        } else {
            const errorImg = evt.target;
            errorImg.classList.add("error-js");
            let audio = new Audio(("./audios/erors.mp3"));
            audio.play()
            setTimeout(() => {
                errorImg.classList.remove("error-js")
            }, 1000);
            point--
            elScore.textContent = point;
            
            
            attemp--
            elAttemp.textContent = attemp
            setTimeout(() => {
                if(attemp == 0){
                    gameOver();
                }
            }, 1000);
        }
        
        // You Win function
        
        setTimeout(() => {
            
            if(roadTitle.length == 0){
                roadWin()
            }
        }, 1200);
        
    }
    
})


