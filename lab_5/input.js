const targets = document.querySelectorAll('.target');//коллекция с эл-ами
let currentElement = null;//текущий эл-т
let offsetX, offsetY;//курсор мыши
let originalPosition = {};

targets.forEach(target => {//перетаскивание мышью
    target.addEventListener('mousedown', (e) => {
        if (currentElement !== target) {
            originalPosition = {
                left: target.style.left || '0px',
                top: target.style.top || '0px'
            };
        }

        currentElement = target;
        offsetX = e.clientX - target.getBoundingClientRect().left;
        offsetY = e.clientY - target.getBoundingClientRect().top;

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    });

    target.addEventListener('dblclick', () => {// двойной клик
        if (currentElement !== target) {
            originalPosition = {
                left: target.style.left || '0px',
                top: target.style.top || '0px'
            };
            currentElement = target;
            target.style.backgroundColor = 'lightblue';//смена цвета
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        }
    });
});

function mouseMoveHandler(e) {
    if (currentElement) {
        currentElement.style.position = 'absolute';
        currentElement.style.left = `${e.clientX - offsetX}px`; //новые координаты
        currentElement.style.top = `${e.clientY - offsetY}px`;
    }
}

function mouseUpHandler() {
    if (currentElement) {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        currentElement.style.backgroundColor = '';
        currentElement = null; //нет эл-та для перетаскивания
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentElement) {
        currentElement.style.left = originalPosition.left;
        currentElement.style.top = originalPosition.top;
        currentElement.style.backgroundColor = ''; //возврат цвета
        currentElement = null;
    }
});