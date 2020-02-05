class PopupImage extends Popup {
    constructor(paramPopup) {
        super(paramPopup);
        this.paramPopup.root.addEventListener('click', this.openWindow.bind(this));
    }
    openWindow(element) {
        if (element.target.classList.contains('place-card__image')) {
            this.paramPopup.popupImage.classList.add('popup__image_is-opened');
            this.paramPopup.popup.classList.add('popup_is-opened');
            this.paramPopup.popupImage.style.backgroundImage = element.target.style.backgroundImage;
        }
    }
}