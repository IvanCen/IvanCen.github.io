var kmCounter = document.getElementById('header__counter-value_km');
var dayCounter = document.getElementById('header__counter-value_days');

var kostromaOffset = document.getElementById('cities__city_kostroma').offsetTop;
var ekbOffset = document.getElementById('cities__city_ekb').offsetTop;
var omskOffset = document.getElementById('cities__city_omsk').offsetTop;
var yablPerevalOffset = document.getElementById('cities__city_yablonovy-pereval').offsetTop;
var khabarovskOffset = document.getElementById('cities__city_khabarovsk').offsetTop;

document.addEventListener('scroll', function () {
  var scrollY = window.pageYOffset;

  if (scrollY <= kostromaOffset + 200) {
    kmCounter.innerHTML = 0;
    dayCounter.innerHTML = 0;
  } else if (scrollY <= ekbOffset + 500) {
    kmCounter.innerHTML = 376;
    dayCounter.innerHTML = 1;
  } else if (scrollY <= omskOffset + 500) {
    kmCounter.innerHTML = 1819;
    dayCounter.innerHTML = 2;
  } else if (scrollY <= yablPerevalOffset + 500) {
    kmCounter.innerHTML = 6110;
    dayCounter.innerHTML = 4;
  } else if (scrollY <= khabarovskOffset + 500) {
    kmCounter.innerHTML = 8534;
    dayCounter.innerHTML = 6;
  } else {
    kmCounter.innerHTML = 9300;
    dayCounter.innerHTML = 6;