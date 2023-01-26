import axios, { Axios, AxiosResponse, AxiosError } from 'axios';
import { post } from 'jquery';

//브라우저 fetch
//노드 fetch

// axios = fetch + 여러 기능(XMLHttpRequest)
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface Created {}
interface Data {
  title: string;
  body: string;
  userId: number;
}
interface AObject<D = any> {
  method: string;
  url?: string;
  data: D;
}

interface A {
  // get<T = any, A = AxiosResponse<T>>(url: string): Promise<A>;
  // post<T = any, A = AxiosResponse<T>, D = Data>(
  //   url: string,
  //   data: Object
  // ): Promise<A>;
  // (url: string, config: AObject): Promise<AxiosResponse<Post>>;
  // (config: AObject): Promise<AxiosResponse<Post>>;
  // isAxiosError<T = any, D = any>(payload: any): payload is AxiosError<T, D>;

  get: <T = any, R = AxiosResponse<T>>(url: string) => Promise<R>;
  post: <T = any, R = AxiosResponse<T>, D = Data>(
    url: string,
    data: D
  ) => Promise<R>;
  isAxiosError: <T>(error: unknown) => error is AxiosError;
  <R = AxiosResponse<Post>>(config: AObject<Data>): Promise<R>;
  <R = AxiosResponse<Post>>(url: string, config: AObject<Data>): Promise<R>;
}

(async () => {
  const a: A = axios;
  try {
    const response = await a.get<Post, AxiosResponse<Post>>(
      'https://jsonplaceholder.typicode.com/posts/1'
    );
    const response2 = await a.post<Created, AxiosResponse<Created>, Data>(
      'https://jsonplaceholder.typicode.com/posts',
      {
        title: 'foo',
        body: 'bar',
        userId: 1,
      }
    );

    const response3 = await a('https://jsonplaceholder.typicode.com/posts', {
      method: 'post',
      data: {
        title: 'foo',
        body: 'bar',
        userId: 1,
      },
    });

    const response4 = await axios({
      method: 'post',
      url: 'https://jsonplaceholder.typicode.com/posts',
      data: {
        title: 'foo',
        body: 'bar',
        userId: 1,
      },
    });
  } catch (error) {
    // if (error instanceof AxiosError) { //커스텀 타입 가드,
    //   error.response
    // }
    if (a.isAxiosError(error)) {
      // {message: '서버 장애입니다.'}
      console.error(
        (error.response as AxiosResponse<{ message: string }>)?.data.message
      );
    }
    const errorResponse = (error as AxiosError).response;
    console.error(errorResponse?.data);
    // console.error((error as AxiosError).response?.data);

    if (a.isAxiosError(error)) {
      console.error(
        (error.response as AxiosResponse<{ message: string }>)?.data.message
      );
    }
  }
})();

//const a = new axios.Axios({url: 'localhost: 8080' }).default
//axios('localhost: 8080')
//axios.get('localhost: 8080');
//axios.default;
