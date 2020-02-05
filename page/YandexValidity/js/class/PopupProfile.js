class PopupProfile extends Popup {
    constructor(paramPopup, formValidator, userInfo) {
        super(paramPopup);
        this.paramPopup.root.addEventListener('click', this.openProfile.bind(this));
        this.formValidator = formValidator;
        this.userInfo = userInfo;
    }
    openProfile(element) {
        if (element.target.classList.contains('user-info__button-edit')) {
            this.paramPopup.popupTitle.textContent = 'Редактировать профиль';
            this.paramPopup.popup.classList.add('popup_is-opened');
            this.paramPopup.formEdit.classList.add('popup__form_is-opened');
            this.paramPopup.popupContent.classList.add('popup__content_is-opened');
            this.formValidator.setSubmitButtonStateEdit();
        }
    }
}