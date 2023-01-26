"use strict";
//removeClass(className_function?: string | string[] | ((this: TElement, index: number, className: string) => string)): this;
$('p').removeClass(['myClass', 'noClass']).addClass('yourClass');
$(['p', 't']).text('hello');
const tag = $('ul li')
    .addClass('hello')
    .addClass(function (index) {
    return 'item-' + index;
});
$(tag).html(function (i) {
    console.log(this);
    return $(this).data('name') + '입니다';
});
const $tag = $(['p', 't']);
$tag.text('123');
$tag.text(123);
$tag.text(function (index) {
    console.log(this, index);
    return true;
});
$tag.text().html(document);
