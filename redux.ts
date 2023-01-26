// import {
//   combineReducers,
//   compose,
//   legacy_createStore as createStore,
// } from 'redux';

// const loginAction = { type: 'LOGIN' };
// const anyAction = { type: 'example', data: '123' };

// const initialState = {
//   //S
//   user: {
//     //S[k]
//     isLoggingIn: false,
//     data: null,
//   },
//   posts: [],
// };

// //상태를 바꾸는 규칙
// //  export type ReducersMapObject<S = any, A extends Action = Action> = {
// //  [K in keyof S]: Reducer<S[K], A>
// //}

// // export type Reducer<S = any, A extends Action = AnyAction> = (
// //   state: S | undefined,
// //   action: A
// // ) => S

// const reducer = combineReducers({
//   // keyof S 여서 user, posts 이다.
//   user: (state, action) => {
//     switch (action.type) {
//       case 'LOGIN':
//         return {
//           isLoggingIn: true,
//           data: {
//             nickname: 'paeng',
//             password: '1234',
//           },
//         };
//       default:
//         return state;
//     }
//   },
//   posts: (state, action) => {
//     if (Array.isArray(state)) {
//       switch (action.type) {
//         case 'ADD_POST':
//           return [...state, action.data];
//         default:
//           return state;
//       }
//     }
//   },
// });

// const store = createStore(reducer, initialState);
// store.dispatch({
//   type: 'LOGIN',
//   data: { nickname: 'paeng', password: '1234' },
// });

// store.getState(); //다음 데이터 가져오기

// // const nextState = {
// //   user: {
// //     isLoggingIn: true,
// //     data: { nickname: 'paeng', password: '1234' },
// //   },
// //   posts: [],
// // };

// store.dispatch({
//   type: 'ADD_POST',
//   data: { title: 'hello', content: 'redux' },
// });
// store.getState();
// // const nextState = {
// //   user: {
// //     isLoggingIn: true,
// //     data: { nickname: 'paeng', password: '1234' },
// //   },
// //   posts: [{title, 'hello', content: 'redux'}],
// // };

// ---------------

import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
  Middleware,
} from 'redux';
import reducer from './reducers';
import { addPost } from './actions/post';
import { logIn, logOut } from './actions/user';
import { ThunkMiddleware } from 'redux-thunk';

const initialState = {
  user: {
    isLoggingIn: true,
    loading: false,
    data: null,
  },
  posts: [],
};

const firstMiddleware: Middleware = (store) => (next) => (action) => {
  console.log('로깅', action);
  next(action);
};

//원래 action은 객체꼴인데 thunk를 사용하여 action을 함수꼴로 만들어 주는 것 => 비동기를 지원할 수 있다.
const thunkMiddleware: Middleware = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    //비동기
    return action(store.dispatch, store.getState);
  }
  return next(action); //동기
};

const enhancer = applyMiddleware(
  firstMiddleware,
  thunkMiddleware as ThunkMiddleware
);

const store = createStore(reducer, initialState, enhancer);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

console.log('1st', store.getState());
//dispatch는 객체만 받아야 하는데 logIn은 thunk여서 애러 납니다.
store.dispatch(
  logIn({
    nickname: 'paeng',
    password: '123',
  })
);

export { store };
// console.log('2nd', store.getState());

// store.dispatch(
//   addPost({
//     userId: 1,
//     id: 1,
//     content: '안녕하세여. 리덕스',
//   })
// );

// console.log('3rd', store.getState());
// store.dispatch(
//   addPost({
//     userId: 1,
//     id: 2,
//     content: '두번째 리덕스',
//   })
// );

// console.log('4th', store.getState());

// store.dispatch(logOut());
// console.log('5th', store.getState());
