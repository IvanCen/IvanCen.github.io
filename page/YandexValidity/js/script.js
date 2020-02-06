const root = document.querySelector('.root');
const popup = document.querySelector('.popup');
const formNew = document.forms.new;
const formEdit = document.forms.edit;
const formAvatar = document.forms.avatar;
const popupContent = popup.querySelector('.popup__content');
const popupImage = popup.querySelector('.popup__image');
const popupTitle = popup.querySelector('.popup__title');
const avatar = formAvatar.avatar;
const place = formNew.name;
const link = formNew.link;
const nameAutor = formEdit.nameAutor;
const description = formEdit.description;
const popupButton = document.querySelector('button[name=cardButton]');
const editButton = document.querySelector('button[name=editButton]');
const avatarButton = document.querySelector('button[name=avatarButton]');
const userInfoName = document.querySelector('.user-info__name');
const userInfoJob = document.querySelector('.user-info__job');
const loader = document.querySelector('.loader');
const container = document.querySelector('.places-list');
const option = {
  baseUrl: 'https://praktikum.tk/cohort7/',
  headers: {
    authorization: '06d98b9d-0650-4eb9-9bc3-34ae3e11679e',
    'Content-Type': 'application/json'
  }
};
const paramPopup = {
  formNew,
  formEdit,
  formAvatar,
  popupImage,
  popupContent,
  popup,
  popupTitle,
  root
}
const inputs = {
  place,
  link,
  nameAutor,
  description,
  avatar,
  formNew,
  formEdit,
  formAvatar
}
const buttons = {
  popupButton,
  editButton,
  avatarButton
}
const cards = [];

const words = {
  ru: {
    validationLenght: 'Должно быть от 2 до 30 символов',
    validationRequired: 'Это обязательное поле',
    validationUrl: 'Здесь должна быть ссылка'
  }
};
const api = new Api(option);
const card = new Card(api);
const cardList = new CardList(place, link);
const userInfo = new UserInfo(nameAutor, description, userInfoName, userInfoJob);
const popupWindow = new Popup(paramPopup);
const formValidator = new FormValidator(inputs, buttons, words, loader);
const popupImageWindow = new PopupImage(paramPopup);
const popupCard = new PopupCard(paramPopup, formValidator);
const popupProfile = new PopupProfile(paramPopup, formValidator, userInfo);
const popupAvatar = new PopupAvatar(paramPopup, formValidator);

function updateUserAvatar(avatarInfo) {
  userInfo.updateUserAvatar(avatarInfo);
}

function updateUserData(cardInfo) {
  userInfo.updateUserInfo(cardInfo.name, cardInfo.about);
}

function setUserData(cardInfo) {
  userInfo.setUserInfo(cardInfo);
  userInfo.updateUserInfo();
}

function renderCards(cardsArr) {
  cardList.render(container, cardsArr, card);
};

function addCard(cardInfo) {
  cardList.addCard(container, cardInfo, card);
};

formValidator.renderLoading(true);
api.userInfoApi();
api.cardsApi(formValidator, renderCards);

formEdit.addEventListener('submit', (event) => {
  event.preventDefault();
  formValidator.submitButtonLoading(true);
  api.userUpdateApi(nameAutor, description, formValidator);
});
formNew.addEventListener('submit', (event) => {
  event.preventDefault();
  api.postCard(place, link);
});
formAvatar.addEventListener('submit', (event) => {
  event.preventDefault();
  formValidator.submitButtonLoading(true);
  api.userUpdateAvatar(avatar, formValidator);
});