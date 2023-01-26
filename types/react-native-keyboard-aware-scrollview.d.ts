//type 없는 라이브러리 type 만들기
//declare module 라이브러리 이름(import 해온 이름) {}
//import, export 가 있어야지만 다른 tsx 파일에서 인식이 된다. -> 그래서 차선책으로 export{}을 사용

declare module 'react-native-keyboard-aware-scrollview' {
  // KeyboardAwareScrollView 타입 만들기
  //setting 방법
  //https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html

  import * as React from 'react';
  //declare const KeyboardAwareScrollView: React.Component;
  // 응용해보기
  class KeyboardAwareScrollViewComponent extends React.Component<
    ViewProps & { abc: string }
  > {}
  class KeyboardAwareScrollView extends KeyboardAwareScrollViewComponent {}

  export { KeyboardAwareScrollView };
}
