let util = {};
util.title = function (title) {
    title = title ? title + ' - 素焉面试题目汇总' : '素焉面试题目汇总';
    window.document.title = title;
};

util.print = function () {
    window.document.getElementsByClassName('suyan__aside')[0].classList.add('hide');
    window.document.getElementsByClassName('suyan__content__wrapper')[0].style = 'padding-left: 0';
    window.document.getElementsByClassName('suyan__btn__print')[0].classList.add('hide');
    window.print();
    window.document.getElementsByClassName('suyan__aside')[0].classList.remove('hide');
    window.document.getElementsByClassName('suyan__content__wrapper')[0].style = 'padding-left: 200px';
    window.document.getElementsByClassName('suyan__btn__print')[0].classList.remove('hide');
};

export default util;