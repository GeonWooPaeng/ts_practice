//removeClass(className_function?: string | string[] | ((this: TElement, index: number, className: string) => string)): this;
$('p').removeClass(['myClass', 'noClass']).addClass('yourClass');

$(['p', 't']).text('hello');

const tag = $('ul li')
  .addClass('hello')
  .addClass(function (index) {
    return 'item-' + index;
  });

$(tag).html(function (i: number) {
  console.log(this);
  return $(this).data('name') + '입니다';
});

//export = jQuery  -> module.exports = jQuery
// import $ = require('jQuery')'
// import * as $ from 'jQuery';

//esModuleIntrop: true //commonJS 를 ESModule system처럼 해주는 태그

// import $ from 'jQuery';

// export = jQuery -> module.exports = jQuery //commonJS
//import $ = require('jQuery')
//import * as $ from 'jQuery';

// 다른 곳에서 a, b 등 문자를 사용할 수 있어 겹침을 줄이기 위한 방법

//----------------

// interface pQuery<T> {
//   text(
//     param?:
//       | string
//       | number
//       | boolean
//       | ((this: T, index: number) => string | number | boolean)
//   ): this;
//   html(param: string | Document): void;
// }

interface pQuery {
  text(
    param?: string | number | ((this: pQuery, index: number) => boolean)
  ): pQuery;
  html(param: string | Document): this;
}
const $tag: pQuery = $(['p', 't']) as unknown as pQuery;

$tag.text('123');

$tag.text(123);

$tag.text(function (index) {
  console.log(this, index);
  return true;
});

$tag.text().html(document);
