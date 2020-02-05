class CardList {
    constructor(name, link) {
        this.name = name;
        this.link = link;
    }
    render(container, cards, card) {
        cards.forEach( (item) => {
            container.appendChild(card.create(item.name, item.link, item._id, item.likes));            
          })     
    }
    reset(){
        this.name.value = '';
        this.link.value = '';
    }
    addCard(container, cardInfo, card) {
        container.appendChild(card.create(this.name.value, this.link.value, cardInfo._id, cardInfo.likes));
        this.reset()
    }
}

