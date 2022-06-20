const container = document.querySelector(".grid")
const widthRange = document.querySelector("#width-range");
const heightRange = document.querySelector("#height-range");
const widthValue = document.querySelector(".width-value");
const heightValue = document.querySelector(".height-value");
const chooseColor = document.querySelector(".color-list")


const colorList = document.querySelectorAll(".color");
const addColor = document.querySelector('#add-color');
let color;


const btnCreate = document.querySelector("#create-grid");
const btnClear = document.querySelector("#clear-grid");
const btnErase = document.querySelector("#erase-btn");
const btnPaint = document.querySelector("#paint-btn");

const events = {
    mouse: {
        down: "mousedown",
        up: "mouseup",
        move: "mousemove"
    },

    touch: {
        down: "touchstart",
        up: "touchend",
        move: "touchmove"
    }
}

let deviceType = "";

function isTouchDevice() {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true
    } catch (e) {
        deviceType = "mouse";
        return false
    }
}

let paint = false;
let erase = false;

widthRange.addEventListener('input', (e) => {
    widthValue.innerHTML = e.target.value
});
heightRange.addEventListener('input', (e) => {
    heightValue.innerHTML = e.target.value
})

btnClear.addEventListener('click', () => {
    container.innerHTML = "";
    container.style.display = 'none'
})


btnErase.addEventListener('click', () => {
    erase = true
});

btnPaint.addEventListener('click', ()=>{
    erase = false;
})



btnCreate.addEventListener('click', () => {
    let count = 0
    container.innerHTML = "";
    for (let i = 0; i < heightValue.innerText; i++) {
        count += 2
        let row = document.createElement("div")
        row.classList.add("gridRow");
        for (let j = 0; j < widthValue.innerText; j++) {
            count += 2
            let col = document.createElement("div");
            col.classList.add("gridCol");

            col.setAttribute('id', `gridCol-${count}`);


            col.addEventListener(events[deviceType].down, () => {
                //start to draw
                paint = true

                if (erase) {
                    col.style.backgroundColor = "transparent"
                } else {
                    col.style.backgroundColor = color;
                }
            });

            col.addEventListener(events[deviceType].move, (e)=>{
                //elementFromPoint -> retorna o elemento na posição x,y do mouse 
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touch[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touch[0].clientY,
                ).id;

                //checker
                checker(elementId)
            })

            col.addEventListener(events[deviceType].up, ()=>{
                paint = false;
            })

            row.appendChild(col);

        }
        container.appendChild(row);
        container.style.display = "block";
    }
})

function checker(elementId){
    let gridColmuns = document.querySelectorAll(".gridCol");

    gridColmuns.forEach((element) =>{
        if(elementId == element.id){
            if(paint && !erase){
                element.style.backgroundColor = color;
            } else if(paint && erase){
                element.style.backgroundColor = 'transparent'
            }
        }
    })
}

chooseColor.addEventListener('click', e=>{
    colorList.forEach(el => el.classList.remove('selected'))
    const choosedColor = e.target;
    if(choosedColor.classList.contains('color')){
        e.target.classList.add('selected')
        color = choosedColor.style.backgroundColor;
    }
})

addColor.addEventListener("click", ()=>{
    document.querySelector(".add-new-color").style.display = "block"
})


isTouchDevice()


console.log(colorList)


