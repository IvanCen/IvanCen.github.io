class Card {
    constructor(api) {
        this.api = api;
    }
    create(nameValue, linkValue, id, likes) {
        this.placeCard = document.createElement('div');
        this.placeCard.classList.add('place-card');
        this.placeCard.insertAdjacentHTML('beforeend', `
            <div class="place-card__image">
                <button class="place-card__delete-icon"></button>
            </div>
            <div class="place-card__description">
                <h3 class="place-card__name"></h3>
                <div class="place-card__like-container">
                    <button class="place-card__like-icon"></button>
                    <span class="place-card__like-counter"></span>
                </div>
            </div>`);
        this.placeCard.setAttribute('id', id);
        this.placeCard.querySelector('.place-card__name').textContent = nameValue;
        this.placeCard.querySelector('.place-card__image').style.backgroundImage = `url(${linkValue})`;
        this.placeCard.querySelector('.place-card__like-counter').textContent = likes.length;
        this.likeButton = this.placeCard.querySelector('.place-card__like-icon');
        this.removeButton = this.placeCard.querySelector('.place-card__delete-icon');
        this.setEvent();
        return this.placeCard;
    }
    like() {
        const currentId = event.target.closest('.place-card').getAttribute('id');
        event.target.classList.toggle('place-card__like-icon_liked');
        if (event.target.classList.contains('place-card__like-icon_liked')) {
            this.api.like(currentId);
            event.target.nextElementSibling.textContent = Number(event.target.nextElementSibling.textContent) + 1;

        } else {
            this.api.unlike(currentId);
            event.target.nextElementSibling.textContent = Number(event.target.nextElementSibling.textContent) - 1;
        }
        
    }
    remove() {
        if (window.confirm('Вы действительно хотите удалить эту карточку?')) {
            event.target.closest('.place-card').remove();
            const currentId = event.target.closest('.place-card').getAttribute('id');
            this.api.deleteCard(currentId);
        }
    }
    setEvent() {
        this.likeButton.addEventListener('click', this.like.bind(this));
        this.removeButton.addEventListener('click', this.remove.bind(this));
    }
}