const targets = document.querySelectorAll('.target');//коллекция с элементами
let currentElement = null;//текущий элемент
let offsetX, offsetY;//курсор мыши
let originalPosition = {};//исходные позиции

targets.forEach(target => {//перетаскивание мышью и касания
    target.addEventListener('mousedown', (e) => startDragging(e, target));
    target.addEventListener('touchstart', (e) => startDragging(e, target));//обработка касания

    target.addEventListener('dblclick', () => {//двойной клик
        if (currentElement !== target) {
            originalPosition = {
                left: target.style.left || '0px',
                top: target.style.top || '0px'
            };
            currentElement = target;
            target.style.backgroundColor = 'lightblue';//смена цвета
            //доб обработчики для перемещения
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
            document.addEventListener('touchmove', mouseMoveHandler);//обработка перемещения
            document.addEventListener('touchend', mouseUpHandler);//обработка окончания касания
        }
    });
});

function startDragging(e, target) {
    if (currentElement !== target) {
        originalPosition = {
            left: target.style.left || '0px',
            top: target.style.top || '0px'
        };
    }

    currentElement = target;
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;

    offsetX = clientX - target.getBoundingClientRect().left;
    offsetY = clientY - target.getBoundingClientRect().top;

    currentElement.style.position = 'absolute';
    currentElement.style.backgroundColor = 'lightblue';//смена цвета

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
    document.addEventListener('touchmove', mouseMoveHandler);//обработка перемещения
    document.addEventListener('touchend', mouseUpHandler);//обработка окончания касания
}

function mouseMoveHandler(e) {
    if (currentElement) {
        const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;

        currentElement.style.left = `${clientX - offsetX}px`;//новые координаты
        currentElement.style.top = `${clientY - offsetY}px`;
    }
}

function mouseUpHandler() {
    if (currentElement) {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        document.removeEventListener('touchmove', mouseMoveHandler);//убираем обработчик перемещения
        document.removeEventListener('touchend', mouseUpHandler);//убираем обработчик окончания касания

        //убираем цвет только если не произошло отмены
        currentElement.style.backgroundColor = '';
        currentElement = null;//нет элемента для перетаскивания
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentElement) {
        currentElement.style.left = originalPosition.left;
        currentElement.style.top = originalPosition.top;
        currentElement.style.backgroundColor = '';// возврат цвета
        currentElement = null;
    }
});

//Обработка второго пальца
document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1 && currentElement) {
        currentElement.style.left = originalPosition.left;//возвращаем элемент на исходную позицию
        currentElement.style.top = originalPosition.top;
        currentElement.style.backgroundColor = '';//возврат цвета
        currentElement = null;//заканчиваем перетаскивание
    }
});