class PopupAvatar extends Popup {
    constructor(paramPopup, formValidator) {
        super(paramPopup);
        this.paramPopup.root.addEventListener('click', this.openAvatar.bind(this));
        this.formValidator = formValidator;
    }
    openAvatar(element) {
        if (element.target.classList.contains('user-info__photo')) {
            this.paramPopup.popupTitle.textContent = 'Обновить аватар';
            this.paramPopup.popup.classList.add('popup_is-opened');
            this.paramPopup.formAvatar.classList.add('popup__form_is-opened');
            this.paramPopup.popupContent.classList.add('popup__content_is-opened');
            this.formValidator.setSubmitButtonStateAvatar();
        }
    }
}