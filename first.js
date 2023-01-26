"use strict";
// interface Arr<T> {
//   forEach(callback: (item: T) => void): void;
//   map<S>(callback: (v: T, index: number) => S): S[];
//   filter<S extends T>(callback: (item: T) => item is S): S[];
//   reduce<S>(callback: (acc: S, item: T) => S, init: S): S;
// }
// const a: Arr<number> = [1, 2, 3, 4, 5];
// a.filter((item): item is number => item === 1); // boolean, T
// a.reduce((acc, value) => acc + value, 0);
// a.reduce((acc: number[], value) => (acc = [...acc, value]), []);
// const c: Arr<number | string> = [1, '2', 3, '4', 5];
// c.filter((item): item is string => typeof item === 'string'); // boolean, string
// c.filter((item): item is number => typeof item === 'number'); // boolean, number
// c.reduce((acc: (number | string)[], value) => (acc = [...acc, value]), []);
// function zip(
//   x: number,
//   y: string,
//   z: boolean
// ): { x: number; y: string; z: boolean } {
//   return { x, y, z };
// }
//T는 무조건 함수여야 된다.
// infer -> 추론
// infer로 매개변수 자리를 추론해라
// type P<T extends (...args: any) => any> = T extends (...args: infer A) => any
//   ? A
//   : never;
// type R<T extends (...args: any) => any> = T extends (...args: any) => infer A
//   ? A
//   : never;
// type Params = P<typeof zip>;
// type Ret = R<typeof zip>;
// type First = Params[1];
//----------
// //resolve<T>(value: T): Promise<Awaited<T>>
// //then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null): Promise<TResult1 | TResult2>;
// const p1 = Promise.resolve(1)
//   .then((a) => a + 1)
//   .then((a) => a + 1)
//   .then((a) => a.toString());
// //Promise<Awaited<number>> -> Promise<number>
// //Promise<number>
// //Promise<number>
// //Promise<string>
// const p2 = Promise.resolve(2);
// //Promise<number>
// const p3 = new Promise((res, rej) => {
//   setTimeout(res, 1000);
// });
// // Promise<unknown>
// // {'0': Promise<string>, '1': Promise<number>, '2': Promise<unknown>, length: 3};
// //all<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>;
// //T = [Promise<string>, Promise<number>, Promise<unknown>] = {'0': Promise<string>, '1': Promise<number>, '2': Promise<unknown>, length: 3};
// //P = string, number, unknown = '0', '1', '2', length
// //Awaited<[Promise<string>, Promise<number>, Promise<unknown]>
// // Promise<[string, number, unknown]>
// Promise.all([p1, p2, p3]).then((result) => {
//   console.log(result); //[string, number, unknown]
// });
// // T = [p1, p2, p3] = {'0': p1, '1': p2, '2': p3, length: 3}
// //all<T extends readonly unknown[] | []>(values: T): Promise<{-readonly [P in keyof T]}>
//------------------
//bind<T>(this: T, thisArg: ThisParameterType<T>): OmitThisParameter<T>;
//type ThisParameterType<T> = T extends (this: infer U, ...args: never) => any ? U : unknown;
//T = {this: Window | typeof obj}
//U = Window | typeof obj({name: 'paeng'})
// Window | {name: 'paeng'}
//type OmitThisParameter<T> = T extends (...args: infer A) => infer R ? (...args: A) => R : T;
//T  = (this: Window | typeof obj): void
// ...args = ()
// R = void
// function a(this: Window | typeof obj) {
//   console.log(this.name);
// }
// const obj = { name: 'paeng' };
// const c = a.bind(obj);
// c();
// type T = ThisParameterType<typeof a>; //this 추출
// //ThisParameterType<T> 가 unknown이면 타입 추론 실패
// type NoThis = OmitThisParameter<typeof a>; // this 빼고 추출
// const paeng = {
//   name: 'paeng',
//   sayHello(this: { name: string }) {
//     console.log(`hi ${this.name}`);
//   },
// };
// const sayHello = paeng.sayHello;
// const sayHi = paeng.sayHello.bind({ name: 'nero' });
// sayHi();
// function add(a: number, b: number, c: number, d: number, e: number, f: number) {
//   return a + b + c + d + e + f;
// }
// const add1 = add.bind(null);
// add1(1, 2, 3, 4, 5, 6);
// // bind<T, A0, A extends any[] R>(this: (this: null, arg0: 1, ...args: (b: number, c: number, d: number, e: number, f: number)) => number, thisArg: null, arg0: 1): (...args: (b: number, c: number, d: number, e: number, f: number)) => number;
// const add2 = add.bind(null, 1);
// add2(2, 3, 4, 5, 6);
// const add3 = add.bind(null, 1, 2);
// add3(3, 4, 5, 6);
// const add4 = add.bind(null, 1, 2, 3);
// add4(4, 5, 6);
// const add5 = add.bind(null, 1, 2, 3, 4);
// add5(5, 6);
// const add6 = add.bind(null, 1, 2, 3, 4, 5);
// add6(6);
// -----------------
const a = [1, [1, [2]]].flat(2);
//type = number[] | number[][] | number[][][]
// Depth = 1, type = <number | number[] | number[][]>[]
// Depth = 0, type = <number | number | number[]>[]
// type = <number>[] -> number[]
// flat<A, D extends number = 1>(
//   this: A,
//   depth?: D
// ): FlatArray<A, D>[]
