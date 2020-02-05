class FormValidator {
    constructor(inputs, buttons, words, loader) {
        this.inputs = inputs;
        this.buttons = buttons;
        this.words = words;
        this.loader = loader;
        this.inputs.place.addEventListener('input', () => {
            this.checkInputValidityFormNew();
        });
        this.inputs.link.addEventListener('input', () => {
            this.checkInputValidityFormNew();
        });
        this.inputs.description.addEventListener('input', () => {
            this.checkInputValidityFormEdit();
        });
        this.inputs.nameAutor.addEventListener('input', () => {
            this.checkInputValidityFormEdit()
        });
        this.inputs.avatar.addEventListener('input', () => {
            this.checkInputValidityFormAvatar()
        });
    }
    checkInputValidityFormNew() {
        const inputsNew = Array.from(this.inputs.formNew.elements);
        let isValidForm = true;
        inputsNew.forEach((element) => {
            if (element.id != this.buttons.popupButton) {
                if (!this.setEventListenersInput(element)) {
                    isValidForm = false;
                }
            }
        });
        this.setSubmitButtonStateNew(isValidForm);
    }
    checkInputValidityFormEdit() {
        const inputsEdit = Array.from(this.inputs.formEdit.elements);
        let isValidForm = true;

        inputsEdit.forEach((element) => {
            if (element.id != this.buttons.editButton) {
                if (!this.setEventListenersInput(element)) {
                    isValidForm = false;
                }
            }
        });
        this.setSubmitButtonStateEdit(isValidForm);
    }
    checkInputValidityFormAvatar() {
        const inputsAvatar = Array.from(this.inputs.formAvatar.elements);
        let isValidForm = true;

        inputsAvatar.forEach((element) => {
            if (element.id != this.buttons.avatarButton) {
                if (!this.setEventListenersInput(element)) {
                    isValidForm = false;
                }
            }
        });
        this.setSubmitButtonStateAvatar(isValidForm);
    }
    setSubmitButtonStateEdit(isValidForm) {
        if (isValidForm) {
            this.buttons.editButton.removeAttribute('disabled');
            this.buttons.editButton.classList.add('popup__button_enabled');
        } else {
            this.buttons.editButton.setAttribute('disabled', true);
            this.buttons.editButton.classList.remove('popup__button_enabled');
        }
    }
    setSubmitButtonStateNew(isValidForm) {
        if (isValidForm) {
            this.buttons.popupButton.removeAttribute('disabled');
            this.buttons.popupButton.classList.add('popup__button_enabled');
        } else {
            this.buttons.popupButton.setAttribute('disabled', true);
            this.buttons.popupButton.classList.remove('popup__button_enabled');
        }
    }
    setSubmitButtonStateAvatar(isValidForm) {
        if (isValidForm) {
            this.buttons.avatarButton.removeAttribute('disabled');
            this.buttons.avatarButton.classList.add('popup__button_enabled');
        } else {
            this.buttons.avatarButton.setAttribute('disabled', true);
            this.buttons.avatarButton.classList.remove('popup__button_enabled');
        }
    }
    submitButtonLoading(isLoading) {
        if (isLoading) {
            this.buttons.editButton.textContent = 'Загрузка...';
            this.buttons.popupButton.textContent = 'Загрузка...';
            this.buttons.avatarButton.textContent = 'Загрузка...';
        } else {
            this.buttons.editButton.textContent = 'Сохранить';
            this.buttons.popupButton.textContent = '+';
            this.buttons.avatarButton.textContent = 'Сохранить';
        }
    }
    renderLoading(isLoading) {
        if (isLoading) {
            this.loader.classList.add('loader_visible');
        } else {
            this.loader.classList.remove('loader_visible');
        }
    }

    setEventListenersInput(element) {
        const errorElement = document.querySelector(`#error-${element.id}`);

        if (!element.checkValidity()) {
            if (element.type === 'url' && element.value.length >= 1) {
                element.setCustomValidity(this.words.ru.validationUrl);
            }
            if (!element.validity.typeMismatch) {
                element.setCustomValidity('');
            }
            if (element.validity.tooShort || element.validity.tooLong) {
                element.setCustomValidity(this.words.ru.validationLenght);
            }
            if (element.validity.valueMissing) {
                element.setCustomValidity(this.words.ru.validationRequired);
            }
            errorElement.textContent = element.validationMessage;
            element.classList.add('popup__input_invalid');
            return false;
        }
        element.classList.remove('popup__input_invalid');
        return true;
    }
}