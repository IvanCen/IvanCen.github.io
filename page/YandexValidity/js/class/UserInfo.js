class UserInfo {
    constructor(nameAutor, description, userInfoName ,userInfoJob) {
        this.userInfoPhoto = document.querySelector('.user-info__photo');
        this.userInfoLikes = document.querySelector('.place-card__like-counter')
        this.nameAutor = nameAutor;
        this.description = description;
        this.userInfoName = userInfoName;
        this.userInfoJob = userInfoJob;
    }
    setUserInfo(userInfo) {
        this.nameAutor.value = userInfo.name;
        this.description.value = userInfo.about;
        this.userInfoPhoto.style.backgroundImage = `url(${userInfo.avatar})`;
    }
    updateUserInfo() {
        this.userInfoName.textContent = nameAutor.value;
        this.userInfoJob.textContent = description.value;
    }
    updateUserAvatar(userAvatar) {
        this.userInfoPhoto.style.backgroundImage = `url(${userAvatar.avatar})`;
    }
}