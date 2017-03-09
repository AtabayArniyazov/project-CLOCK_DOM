"use strict";

var wrap = document.getElementById('wrapper'), 
	wrapCenterX = wrap.offsetLeft + wrap.offsetWidth / 2, // узнаем центр DIV(обвёртки) по X
	wrapCenterY = wrap.offsetTop + wrap.offsetHeight / 2, // узнаем центр DIV(обвёртки) по Y
	wrapChildElemForDigitalWatch = document.createElement("div"), // создаем DIV(для электронных часов)
	radius = 120, // радиус (растояние)
	radiusForDigitalWatch = 70, // радиус (растояние) для электронных часов
	angleValue = 0, // угол
	distanceOfDigits = 30, // расстояние(в градусах) между цифрами на часах
	time = new Date(), //текущее время
	elemForArrowHours = document.createElement("div"), // создаем DIV(для стрелки часов)
	elemForArrowMinutes = document.createElement("div"), // создаем DIV(для стрелки минут)
	elemForArrowSeconds = document.createElement("div"), // создаем DIV(для стрелки секунд)
	hoursDeg = 30 * (time.getHours() + (1 / 60) * time.getMinutes()), //определяем по времени где должна быть стрелка часов
	minutesDeg = 6 * (time.getMinutes() + (1 / 60) * time.getSeconds()), //определяем по времени где должна быть стрелка минут
	secondsDeg = 6 * time.getSeconds() - 6, //определяем по времени где должна быть стрелка секунд
	hourDigits = 12; //цифры часов (например 1,2,3,4,5,6,7,8,9,10,11,12)

for (var i = 1; i <= hourDigits; i++) {
	var wrapChildElem = document.createElement("div"),// создаем DIV(для номеров часов)
		angle,
		wrapChildElemCenterX,
		wrapChildElemCenterY;

	angleValue += distanceOfDigits;
	angle = angleValue / 180 * Math.PI;

	wrapChildElem = wrap.appendChild(wrapChildElem);//созданный DIV(для номеров часов) делаем дочерным элементом wrap(обвёртка)
	wrapChildElem.classList.add('childElem');//устанавливаем готовый CSS класс для дочерных элементов
	wrapChildElem.innerHTML = i;//значением каждого дочерного элемента будет равен i

	wrapChildElemCenterX = wrapCenterX + radius * Math.sin(angle); // узнаем центр дочерного элемента по X
	wrapChildElemCenterY = wrapCenterY - radius * Math.cos(angle); // узнаем центр дочерного элемента по Y

	wrapChildElem.style.left = Math.round(wrapChildElemCenterX - wrapChildElem.offsetWidth/2) + "px";
	wrapChildElem.style.top = Math.round(wrapChildElemCenterY - wrapChildElem.offsetHeight/2) + "px";
}

// вставляем созданные элементы в конец дочерных элементов wrap(обвёртки)
wrapChildElemForDigitalWatch = wrap.appendChild(wrapChildElemForDigitalWatch); //созданный DIV(для электронных часов) делаем дочерным элементом wrap(обвёртка)
elemForArrowHours = wrap.appendChild(elemForArrowHours);//созданный DIV(для стрелки часов) делаем дочерным элементом wrap(обвёртка)
elemForArrowMinutes = wrap.appendChild(elemForArrowMinutes);//созданный DIV(для стрелки минут) делаем дочерным элементом wrap(обвёртка)
elemForArrowSeconds = wrap.appendChild(elemForArrowSeconds),//созданный DIV(для стрелки секунд) делаем дочерным элементом wrap(обвёртка)

// устанавливаем класс для электронных часов и к каждой стрелке
wrapChildElemForDigitalWatch.classList.add("childElemForDigitalWatch"); //устанавливаем готовый CSS класс для DIV(для электронных часов)
elemForArrowHours.classList.add("elemForArrowHours");//устанавливаем готовый CSS класс для DIV(для стрелки часов)
elemForArrowMinutes.classList.add("elemForArrowMinutes");//устанавливаем готовый CSS класс для DIV(для стрелки минут)
elemForArrowSeconds.classList.add("elemForArrowSeconds");//устанавливаем готовый CSS класс для DIV(для стрелки секунд)

// определяем где будет стоять электронные часы
wrapChildElemForDigitalWatch.style.left = wrapCenterX - wrapChildElemForDigitalWatch.offsetWidth/2 + "px";
wrapChildElemForDigitalWatch.style.top = wrapCenterY - radiusForDigitalWatch + "px";
// определяем где будет стоять стрелка часа
elemForArrowHours.style.top = wrapCenterY - elemForArrowHours.offsetHeight+10 + "px";
elemForArrowHours.style.left = wrapCenterX - elemForArrowHours.offsetWidth/2 + "px";
// определяем где будет стоять стрелка минут
elemForArrowMinutes.style.top = wrapCenterY - elemForArrowMinutes.offsetHeight+10 + "px";
elemForArrowMinutes.style.left = wrapCenterX - elemForArrowMinutes.offsetWidth/2 + "px";
// определяем где будет стоять стрелка секнд
elemForArrowSeconds.style.top = wrapCenterY - elemForArrowSeconds.offsetHeight+10 + "px";
elemForArrowSeconds.style.left = wrapCenterX - elemForArrowSeconds.offsetWidth/2 + "px";

// определяем точку трансформации стрелок часов, минут, секунд по оси X и Y
elemForArrowHours.style.transformOrigin = "center 50px";
elemForArrowMinutes.style.transformOrigin = "center 110px";
elemForArrowSeconds.style.transformOrigin = "center 135px";

// функция для определения положение электронных часов и стрелок для часов, минут, секунд
function arrows() {
		// электронные часы
		var time = new Date(); //текущее время
	    wrapChildElemForDigitalWatch.innerHTML = time.toLocaleTimeString();
		// секундные стрелки
		secondsDeg += 6; //каждую секунду стрелка секунда будет двигать на 6 градусов
	    elemForArrowSeconds.style.transform = "rotate(" + secondsDeg + "deg)";
	    // минутныеные стрелки
	    minutesDeg += 6 * (1/60); //каждую секунду стрелка минута будет двигать на 6*(1/60) градусов
	    elemForArrowMinutes.style.transform = "rotate(" + minutesDeg + "deg)";
	    // часовые стрелки
	    hoursDeg += 6 * (1/360); //каждую секунду стрелка часа будет двигать на 6*(1/360) градусов
	    elemForArrowHours.style.transform = "rotate(" + hoursDeg + "deg)";
	}

window.onload = arrows(); // вызываем функцию arrows на момент загрузки страницы
window.setInterval (arrows, 1000); // устанавливаем setInterval на 1 секунду и выполняем код каждую секунду чтоб стрелки часов, минут и секунд обновляли положени каждую секунду