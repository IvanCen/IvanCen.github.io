class Api {
    constructor(options) {
        this.options = options;
    }
    userInfoApi() {
        fetch(this.options.baseUrl + 'users/me', {
            headers: this.options.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((cardInfo) => {
                return cardInfo;
            })
            .then(setUserData)
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
            });
    }
    userUpdateApi(nameAutor, description, formValidator) {
        fetch(this.options.baseUrl + 'users/me', {
            method: 'PATCH',
            headers: this.options.headers,
            body: JSON.stringify({
                name: nameAutor.value,
                about: description.value
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((cardInfo) => {
                console.log(cardInfo);
                return cardInfo
            })
            .then(updateUserData)
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
            })
            .finally(() => {
                formValidator.submitButtonLoading(false);
            });
    }
    userUpdateAvatar(avatar, formValidator) {
        fetch(this.options.baseUrl + 'users/me/avatar', {
            method: 'PATCH',
            headers: this.options.headers,
            body: JSON.stringify({
                avatar: avatar.value
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((avatarInfo) => {
                return avatarInfo;
            })
            .then(updateUserAvatar)
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
            })
            .finally(() => {
                formValidator.submitButtonLoading(false);
            });
    }
    cardsApi(formValidator, renderCards) {
        fetch(this.options.baseUrl + 'cards', {
            headers: this.options.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((cardsArr) => {
                return cardsArr
            })
            .then(renderCards)
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
            })
            .finally(() => {
                formValidator.renderLoading(false);
            });
    }
    postCard(place, link) {
        return fetch(this.options.baseUrl + 'cards', {
            method: 'POST',
            headers: this.options.headers,
            body: JSON.stringify({
                name: `${place.value}`,
                link: `${link.value}`
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((card) => {
                return card;
            })
            .then(addCard)
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
            });
    }

    deleteCard(id) {
        fetch(this.options.baseUrl + `cards/${id}`, {
            method: 'DELETE',
            headers: this.options.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log('Карточка удалена...почти :)', err);
            });
    }

    like(id) {
        fetch(this.options.baseUrl + `cards/like/${id}`, {
            method: 'PUT',
            headers: this.options.headers,

        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
            });
    }

    unlike(id) {
        fetch(this.options.baseUrl + `cards/like/${id}`, {
            method: 'DELETE',
            headers: this.options.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
            });
    }
}