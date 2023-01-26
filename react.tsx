import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  FunctionComponent,
  FormEvent,
  ChangeEvent,
} from 'react';

const WordRelay: FunctionComponent = () => {
  const [word, setWord] = useState('팽글팽글');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  // const inputEl = useRef<HTMLInputElement>(null);
  const inputEl = useRef<HTMLInputElement>(document.querySelector('.input')!);
  // const inputEl = useRef<HTMLHeadElement>(document.querySelector('head'));
  const mutaRef = useRef(0);

  useEffect(() => {
    console.log('useEffect');

    // const func = async () => {

    // }
    // func();
    mutaRef.current += 1;
  }, []);

  const onSubmitForm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const input = inputEl.current;
      if (word[word.length - 1] === value[0]) {
        setResult('딩동댕');
        setWord(value);
        setValue('');
        if (input) {
          input.focus();
        }
      } else {
        setResult('땡');
        setValue('');
        if (input) input.focus();
      }
    },
    [word, value]
  );

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }, []);

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input
          className="input"
          ref={inputEl}
          value={value}
          onChange={onChange}
        />
        <button>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

export default WordRelay;

type Brand<T, F> = T & { __brand: F };
type EUR = Brand<number, 'EUR'>;
type USD = Brand<number, 'USD'>;

const usd = 10 as USD;
const eur = 10 as EUR;
const krw = 2000;
const bankAccount = 20 as EUR;

function euroToUsd(euro: EUR): number {
  return euro * 1.18;
}
euroToUsd(bankAccount);

// interface P {
//   name: string;
//   title: string;
// }

// interface S {
//   word: string;
//   value: string;
//   result: string;
// }

// interface func {
//   //둘다 약간의 기능이 다르다 -> 언어적 한계
//   a(): void;
//   b: () => void;
// }

// class WordRelay extends React.Component<P, S> {
//   state = {
//     word: '팽',
//     value: '',
//     result: '',
//   };

//   onSubmitForm = (e: React.FormEvent) => {
//     e.preventDefault();
//     const input = this.input;
//     if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
//       this.setState({
//         result: '딩동댕',
//         word: this.state.value,
//         value: '',
//       });
//       if (input) input.focus();
//     } else {
//       this.setState({
//         result: '땡',
//         value: '',
//       });
//       if (input) input.focus();
//     }
//   };

//   onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({ value: e.currentTarget.value });
//   };

//   input: HTMLInputElement | null = null; //this.input을 생성

//   onRefInput = (c: HTMLInputElement) => {
//     this.input = c;
//   };

//   render() {
//     return (
//       <>
//         <div>{this.state.word}</div>
//         <form onSubmit={this.onSubmitForm}>
//           <input
//             ref={this.onRefInput}
//             value={this.state.value}
//             onChange={this.onChangeInput}
//           />
//           <button>클릭!!</button>
//         </form>
//       </>
//     );
//   }
// }

// export default WordRelay;
