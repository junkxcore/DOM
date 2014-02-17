/**
 * Обработчик клика по ссылке с классом 'popup-link'
 * @param {Event} e событие клика
 * @private
 */

document.body.addEventListener('click', _onMouseClick, false);

function _onMouseClick(e) {

    var target = e && e.target || event.srcElement;

    if (target.classList.contains('popup-link')) {
        event.preventDefault ? event.preventDefault() : (event.returnValue = false);
        openPopupFromLink(e.target);
    }
}

/**
 * Получает данные из ссылки
 * на основе этих данных создаёт попап (через createPopup) и добавляет его в DOM
 * @param {HTMLElement} link Ссылка с data-аттрибутами
 */
function openPopupFromLink(link) {

    var title = link.getAttribute('data-title'),
        message = link.dataset.message.replace(/%s/, link.getAttribute('href')),
        href = function() {
            event.preventDefault();
            document.location.href = link.getAttribute('href');
        }

    if (!document.getElementsByClassName('popupwrap')[0]) {
        createPopup(title, message, href);
    } else {
        document.getElementsByClassName('popupwrap')[0].style.display = 'block';
        document.getElementsByTagName('h3')[0].innerText = title;
        document.getElementsByClassName('message')[0].innerText = message;
        document.getElementsByClassName('buttonOk')[0].addEventListener('click', href, false);
    };
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
        popupwrap = document.createElement('div'),
        popupTitle = document.createElement('h3'),
        popupMessage = document.createElement('p'),
        buttonCancel = document.createElement('button'),
        buttonOk = document.createElement('button'),
        close = document.createElement('i');

    popupTitle.innerText = title;
    popupMessage.innerText = message;
    buttonOk.innerText = 'Да';
    buttonCancel.innerText = 'Нет';

    popup.classList.add('popup');
    popupwrap.classList.add('popupwrap');
    close.classList.add('close');
    popupMessage.classList.add('message');
    buttonOk.classList.add('buttonOk');
    buttonCancel.classList.add('buttonCancel');

    function closepopup(event) {
        event.preventDefault();
        document.getElementsByClassName('popupwrap')[0].style.display = 'none';
        document.getElementsByClassName('buttonOk')[0].removeEventListener('click', onOk, false);
    }

    buttonCancel.addEventListener('click', closepopup, false);
    close.addEventListener('click', closepopup, false);
    buttonOk.addEventListener('click', onOk, false);

    popupwrap.appendChild(popup);
    popup.appendChild(close);
    popup.appendChild(popupTitle);
    popup.appendChild(popupMessage);
    popup.appendChild(buttonOk);
    popup.appendChild(buttonCancel);

    document.body.appendChild(popupwrap);
}