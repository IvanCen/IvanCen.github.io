class Popup {
    constructor(paramPopup) {
      this.paramPopup = paramPopup;  
      this.paramPopup.root.addEventListener('click', this.close.bind(this));
            }
    close(element) {
        if (element.target.classList.contains('popup__close') || element.target.classList.contains('popup__button')) { 
            this.paramPopup.formNew.classList.remove('popup__form_is-opened');     
            this.paramPopup.popup.classList.remove('popup_is-opened');
            this.paramPopup.formEdit.classList.remove('popup__form_is-opened');
            this.paramPopup.popupContent.classList.remove('popup__content_is-opened');
            this.paramPopup.popupImage.classList.remove('popup__image_is-opened');
            this.paramPopup.formAvatar.classList.remove('popup__form_is-opened');
        }
    }
}
