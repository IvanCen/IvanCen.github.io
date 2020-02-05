class PopupCard extends Popup {
    constructor(paramPopup, formValidator) {
        super(paramPopup);
        this.paramPopup.root.addEventListener('click', this.openCard.bind(this));
        this.formValidator = formValidator;
    }
    openCard(element) {
        if (element.target.classList.contains('user-info__button')) {
            this.paramPopup.popupTitle.textContent = 'Новое место';
            this.paramPopup.popup.classList.add('popup_is-opened');
            this.paramPopup.formNew.classList.add('popup__form_is-opened');
            this.paramPopup.popupContent.classList.add('popup__content_is-opened');
            this.formValidator.setSubmitButtonStateNew();
        }
    }
}