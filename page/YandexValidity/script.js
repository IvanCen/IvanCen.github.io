/* eslint-disable spellcheck/spell-checker */
const root = document.querySelector('.root');
const placesList = document.querySelector('.places-list');
const popup = document.querySelector('.popup');

/* 
    Можно лучше: если в переменной хранится список, то нужно давать ей
    название во множественном числе - например forms 
*/
const form = document.querySelectorAll('form');

/* 
    Можно лучше: в дипломной работе есть требование "если имеется несколько способов использования Api
    то применяется только один", поэтому все элементы на странице нужно искать через querySelector 
*/
const formNew = document.forms.new;
const formEdit = document.forms.edit;

/* 
    Можно лучше: пропустил это в прошлом ревью - обращаться к формам по индексу
    очень плохо, изменится верстка формы и очередность форм может изменится и все перестанет работать
    Нужно использовать querySelector 
*/
const place = form[0].name;
const link = form[0].link;
const nameAutor = form[1].nameAutor;
const description = form[1].description;
const popupButton = document.querySelector('button[name=cardButton]');
const editButton = document.querySelector('button[name=editButton]');
const popupTitle = popup.querySelector('.popup__title');
const userInfoName = document.querySelector('.user-info__name');
const userInfoJob = document.querySelector('.user-info__job');
const popupContent = popup.querySelector('.popup__content');
const popupImage = popup.querySelector('.popup__image');
description.value = 'Sailor, Researcher';
nameAutor.value = 'Jaques Causteau';
const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
},
{
    name: 'Нургуш',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
},
{
    name: 'Тулиновка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
},
{
    name: 'Остров Желтухина',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
},
{
    name: 'Владивосток',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
}
];

function newCard(nameValue, linkValue) {
    /* 
        Можно лучше: вставка данных через интерполяцию строки и insertAdjacentHTML приводит в уязвимости XSS
        Попробуйте вставить в название добавляемой карточки код <b style="color: red">Red</b>
        Он при ставки карточки вставится как обычный html http://prntscr.com/q358gq
        А если данные придут с сервера в них может быть код злоумышленника и он вставится на страницу как обычный html.
        Поэтому нужно вставлять данные через textContent и style.backgroundImage


        //Приведу пример 
        //в функции создаем и возвращаем DOM элемент
        const placeCard = document.createElement("div");
        placeCard.classList.add("place-card");
        placeCard.insertAdjacentHTML('beforeend', `
            <div class="place-card__image">
                <button class="place-card__delete-icon"></button>
            </div>
            <div class="place-card__description">
                <h3 class="place-card__name"></h3>
                <button class="place-card__like-icon"></button>
            </div>`);
        placeCard.querySelector(".place-card__name").textContent = nameValue;
        placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${linkValue})`;

        //Функция возвращает DOM элемент карточки, вызываем её, получаем
        //элемент и добавляем в контейнер с помощью метода appendChild
    */
    return `<div class="place-card">
    <div class="place-card__image" style="background-image: url(${linkValue})">
      <button class="place-card__delete-icon"></button>
    </div>
    <div class="place-card__description">
      <h3 class="place-card__name">${nameValue}</h3>
      <button class="place-card__like-icon"></button>
    </div>
  </div>`;
}

function addCard(event) {
    event.preventDefault();
    /* Можно лучше: если Вы боритесь с xss с помощью экранирования - экранировать нужно также и адрес ссылки
    т.к. вредоносный код может быть и там */
    const cardContainer = newCard(place.value.replace(/(["'\/])/g, '\\'+'$1'), link.value);
    placesList.insertAdjacentHTML('beforeend', cardContainer);
    place.value = '';
    link.value = '';
    popup.classList.remove('popup_is-opened');
    popupButton.setAttribute('disabled', true);
    popupButton.classList.remove('popup__button_enabled');
    popupButton.removeAttribute('style', 'color');
}

function editForm(event) {
    event.preventDefault();

    userInfoJob.textContent = description.value;
    userInfoName.textContent = nameAutor.value;
    popup.classList.remove('popup_is-opened');
    editButton.setAttribute('disabled', true);
    editButton.classList.remove('popup__button_enabled');
    editButton.removeAttribute('style', 'color');
}

function activateError(element) {
    element.style.borderColor = '#FF3333';
}

function resetError(element) {
    element.textContent = '';
    element.style.borderColor = 'rgba(0, 0, 0, .2)';
}

function validate(element) {
    const errorElement = document.querySelector(`#error-${element.id}`);
    /* Можно лучше: 
    - валидация так и дублируется два раза - при задании активности кнопки и при валидации самого элемента ввода
    - при событии одного элемента ввода задается активность кнопки popupButton и editButton - такое поведение не верно,
    должна задаваться активность только той кнопки, которая находится в форме где произошло событие ввода
   
    */
    if (element.value.length !== 0) {
        popupButton.removeAttribute('disabled');
        popupButton.classList.add('popup__button_enabled');
        popupButton.style.color = '#ffff';
    }
    /* Можно лучше: проверку на длину вводимой строки можно сделать через свойства
        validity.tooLong и validity.tooShort ✓✓✓   - заменено не везде

       https://developer.mozilla.org/ru/docs/Learn/HTML/Forms/%D0%92%D0%B0%D0%BB%D0%B8%D0%B4%D0%B0%D1%86%D0%B8%D1%8F_%D1%84%D0%BE%D1%80%D0%BC%D1%8B 
       раздел  Проверка форм с использованием JavaScript
    */
    if (place.value.length < 2 || place.value.length > 30 || link.value.length === 0) {
        popupButton.setAttribute('disabled', true);
        popupButton.classList.remove('popup__button_enabled');
        popupButton.style.color = 'rgba(0, 0, 0, .2)';
    }
    if (nameAutor.value.length >= 2 && description.value.length >= 2) {
        editButton.removeAttribute('disabled');
        editButton.classList.add('popup__button_enabled');
        editButton.style.color = '#ffff';
    }
    if (element.value.length < 2 || element.value.length > 30) {
        editButton.setAttribute('disabled', true);
        editButton.classList.remove('popup__button_enabled');
        editButton.style.color = 'rgba(0, 0, 0, .2)';
    }
    if (!element.checkValidity()) {
        /* Можно лучше: проверять validity.typeMismatch именно у ссылок, для этого
           можно обернуть проврку в условие if (element.type === 'url')
         */
        if (element.validity.typeMismatch) {
            element.setCustomValidity('Здесь должна быть ссылка');
            popupButton.setAttribute('disabled', true);
            popupButton.classList.remove('popup__button_enabled');
            popupButton.style.color = 'rgba(0, 0, 0, .2)';
        } 
        /* Можно лучше: вместо этого блока if логичнее сделать блок else т.к.
        он выполняется если предыдущий блок if не выполняется */
        if (!element.validity.typeMismatch) {
            element.setCustomValidity('');
        }

        if (element.validity.tooShort || element.validity.tooLong) {
            element.setCustomValidity('Должно быть от 2 до 30 символов');
            link.setCustomValidity('');
        }

        /*
            Можно лучше: здесь можно воспользоваться проверкой validity.valueMissing
        */
        if (element.value.length === 0) {
            element.setCustomValidity('Это обязательное поле');
        }

        /*
            Можно лучше: проверка if (element.value.length >= 2) по сути это инверсия
            всех предыдущих проверок, тем самым логика дублируется два раза, лучше не делать 
            проверку ещё раз, а в начале завести переменную в которую записывать true 
            если по какойто причин поле не валидно, а здесь проверять эту переменную
        */
        if (element.value.length >= 2) {
            description.setCustomValidity('');
            nameAutor.setCustomValidity('');
            place.setCustomValidity('');
        }
        activateError(element);
        errorElement.textContent = element.validationMessage;
        nameAutor.style.marginBottom = '0px';
        return false;
    }
    return true;
}

/* Можно лучше: 
- разбить на две функции, не нужно описывать в одной функции валидацию разных форм 
- название функции не верно описывает то что она делает  sendForm - отправить форму
на самом деле она сейчас выполняет валидацию полей формы*/
function sendForm(event) {
    event.preventDefault();

    /* Можно лучше: как уже писал выше - не используйте доступ по индексу для элементов на странице */
    const inputsNew = Array.from(form[0].elements);
    const inputsEdit = Array.from(form[1].elements);
    let isValidForm = true; /* Можно лучше: значение isValidForm никак не используется */
    inputsEdit.forEach((element) => {
        if (element.id != editButton) {
            if (!validate(element)) {
                isValidForm = false;
            }
        }
    });
    inputsNew.forEach((element) => {
        if (element.id != popupButton) {
            if (!validate(element)) {
                isValidForm = false;
            }
        }
    });
}

/* 
    Можно лучше: название функции никак не описывает что она делает. можно назвать
    её например handleCardEvents
*/
function myFuncList(e) {
    if (e.target.classList.contains('place-card__like-icon')) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }
    if (e.target.classList.contains('place-card__delete-icon')) {
        event.target.closest('.place-card').remove();
    }
    if (e.target.classList.contains('place-card__image')) {
        popupContent.style.display = 'none';
        popupImage.style.display = 'block';
        popup.classList.toggle('popup_is-opened');
        popupImage.style.backgroundImage = e.target.style.backgroundImage;
    }
}

function popupOpen(element) {
    /*
        Можно лучше: не нужно преобразовывать один полпап в другой, функционал попапов
        совершенно разный и при дальнейше разработке программы их внешний вид может
        становится очень разным и кажый раз придется дописывать код преобразования одного попапа
        в другой, тем самым усложняя себе работу
        
        сделайте разметку для каждого попапа в index.html отдельно
    */
    if (element.target.classList.contains('user-info__button-edit')) {
        popupContent.style.display = 'block';
        popupTitle.textContent = 'Редактировать профиль';
        popup.classList.toggle('popup_is-opened');
        formNew.style.display = 'none';
        popupImage.style.display = 'none';
        formEdit.style.display = 'block';
    }
    if (element.target.classList.contains('user-info__button')) {
        popupContent.style.display = 'block';
        popupTitle.textContent = 'Новое место';
        popup.classList.toggle('popup_is-opened');
        formEdit.style.display = 'none';
        popupImage.style.display = 'none';
        formNew.style.display = 'block';
    }
}

function popupClose(element) {
    if (element.target.classList.contains('popup__close')) {
        popup.classList.remove('popup_is-opened');
    }
}

function handleValidate(event) {
    resetError(event.target);
    validate(event.target);
}

/*
    Можно лучше: обработка событий открытия закрытия попапов все ещё делегирована 
    Как я уже писал лучше в данном случаее не использовать делегирование, а 
    вешать обработчик на каждую кнопку
*/
function popupToggle(event) {
    popupClose(event);
    popupOpen(event);
}

root.addEventListener('click', myFuncList);
root.addEventListener('click', popupToggle);
formNew.addEventListener('submit', addCard);
formEdit.addEventListener('submit', editForm);
formEdit.addEventListener('submit', sendForm);
place.addEventListener('input', handleValidate);
link.addEventListener('input', handleValidate);
description.addEventListener('input', handleValidate);
nameAutor.addEventListener('input', handleValidate);

initialCards.forEach((item) => {
    placesList.insertAdjacentHTML('afterbegin', newCard(item.name, item.link));
});

/*

    Часть задания работает, отлично что сделана также валидация попапа добавления карточки,
    но есть и некоторые замечания:

    Надо исправить: 
    - если одно поле пустое, а затем начать редактировать другое поле, то кнопка становится активной 
    http://prntscr.com/qb1rzz http://prntscr.com/qb1riz 
    Для задания активности кнопки нужно проверять оба поля  ✓✓✓

    - если одно поле пустое и нажать кнопку сохранить то падает ошибка ✓✓✓
    Uncaught TypeError: Cannot set property 'textContent' of null
    at resetError (script.js:125)
    at validate (script.js:130)
    at script.js:161
    at Array.forEach (<anonymous>)
    at HTMLFormElement.sendForm (script.js:159)

    - при открытии попапа редактирования профиля если раньше была ошибка в 
    поля подставляются данные, но ошибка остается http://prntscr.com/qb1r56  ✓✓✓

    - при открытии попапа профиля в поля всегда подставляются данные Jaques Causteau
    Sailor, Researcher, а должны подставляться ранее сохраненные данные ✓✓✓


    Можно лучше: 
    - проверять ссылку можно воспользовавшись стандартной валидацияей браузера - свойство .validity.typeMismatch ✓✓✓
    https://developer.mozilla.org/ru/docs/Learn/HTML/Forms/%D0%92%D0%B0%D0%BB%D0%B8%D0%B4%D0%B0%D1%86%D0%B8%D1%8F_%D1%84%D0%BE%D1%80%D0%BC%D1%8B 
    - раздел  Проверка форм с использованием JavaScript 

    - проверку на длинну вводимой строки можно сделать через свойства
        validity.tooLong и validity.tooShort  ✓✓✓

    - не использовать делегирование для кнопок открытия и закрытия попапов ✓✓✓

    - не нужно преобразовывать один полпап в другой, сделайте
      разметку для каждого попапа в index.html отдельно

    - вставка данных через интерполяцию строки и insertAdjacentHTML приводит в уязвимости XSS
    
    - не нужно дублировать проверки валидации в нескольких разных функциях ✓✓✓

*/


/*
    Самые критичные замечания исправлены, но осталось ещё много мест над которыми лучше поработать
    перед выполнением следующей проктной работы. 
    Одиними из общих принципов разработки являются DRY и принцип единственной ответственности. 
    DRY говорит о том что не нужно дублировать - в прорамме сейчас есть дублирование логики проверок
    Принцип единственной ответственности - каждая сущность в программе отвчает за чтото одно, сейчас
    в sendForm вызывается валидация двух разных форм

    Места где можно сделать лучше:
    - если в переменно хранится массив (например результат querySelectorAll) она должна называться
    существительным во множественном числе
    - никогда не брать элементы на странице по их индексу, добавится элемент в начало и вся программа сломается
    - доступ ко всем элементам на странице через querySelector
    - если экранировать данные для предотвращения xss то нужно экранировать и данные ссылки
    - лучше не задавать в js коде стили элемента через element.style , в js оперировать классами
    добавлять оределенный css класс элементу или удалять, а весь css код описывающий отображение
    элемента оставить в css файле
    - все ещё есть дублирование валидации, чтобы от этого избавиться можно сделать так
      делегировать событие ввода форме и при событии ввода в форме вызывать:
            let isValidForm = true;
            inputsEdit.forEach((element) => {
                if (element.id != editButton) {
                    if (!validate(element)) {
                        isValidForm = false;
                    }
                }
            });
            if (isValidForm) {
                editButton.removeAttribute('disabled');
                editButton.classList.add('popup__button_enabled');
                editButton.style.color = '#ffff';
            } else {
                editButton.setAttribute('disabled', true);
                editButton.classList.remove('popup__button_enabled');
                editButton.style.color = 'rgba(0, 0, 0, .2)';
            }
    
    - при валидации формы задавать активность именно той кнопки которая, соответствует форме в которой
    было событие ввода, а не всех кнопок
    - вместо проверки element.value.length === 0 лучше использовать validity.valueMissing
    - события открытия и закрытия попапа все ещё делегированы документу, лучше этого не делать
    - лучше не преобразовывать один попап в другой, а сделать разную разметку для обоих попапом
    эти попапы никак не связаны, зачем делать общий контейнер <div class="popup">, лучше сделать контейнер
    для каждого попапа 

    
*/