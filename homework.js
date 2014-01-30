/**
 * Обработчик клика по ссылке с классом 'popup-link'
 * @param {Event} e событие клика
 * @private
 */
var elements = document.querySelectorAll('a');

for (var i = 0; i < elements.length; i++) {
	elements[i].onclick = function(event){
		event.preventDefault();
		_onMouseClick(event);
	}
};

function _onMouseClick(e) {

	var link = e.target;
	openPopupFromLink(link);

}

/**
 * Получает данные из ссылки
 * на основе этих данных создаёт попап (через createPopup) и добавляет его в DOM
 * @param {HTMLElement} link Ссылка с data-аттрибутами
 */
function openPopupFromLink(link) {

	var url = link.getAttribute('href'), 
		title = link.getAttribute('data-title'),
		message = link.getAttribute('data-message');

	createPopup(title, message, url);

}

/**
 * Создаёт DOM-узел с сообщением
 * @param {String} title Заголовок сообщение
 * @param {String} message Текст сообщения сообщение
 * @param {Function} onOk Обработчик клика по кнопке 'Да'
 * @returns {HTMLElement}
 */
function createPopup(title, message, onOk) {

	var popup = document.createElement('div'),
		popupTitle = document.createElement('h3'),
		popupMessage = document.createElement('p'),
		buttonCancel = document.createElement('button'),
		buttonOk = document.createElement('button');
		popupwrap = document.createElement('div');
		close = document.createElement('i');
		

	if (message.indexOf('%s') != -1) {
		message = message.replace('%s', onOk);
	};

	popupTitle.innerText = title;
	popupMessage.innerText = message;
	buttonOk.innerText = 'Да';
	buttonCancel.innerText = 'Нет';


	popup.classList.add('popup');
	popupwrap.classList.add('popupwrap');
	close.classList.add('close');


	buttonCancel.onclick = function(event) {
		event.preventDefault();
		document.body.removeChild(popupwrap);
	}

	buttonOk.onclick = function(event) {
		event.preventDefault();
		document.location.href = onOk;
	}

	close.onclick = function(event) {
		event.preventDefault();
		document.body.removeChild(popupwrap);
	}

	popupwrap.appendChild(popup);
	popup.appendChild(close);
	popup.appendChild(popupTitle);
	popup.appendChild(popupMessage);
	popup.appendChild(buttonOk);
	popup.appendChild(buttonCancel);
	
	document.body.appendChild(popupwrap);
}
