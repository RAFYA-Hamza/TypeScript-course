import { ReactNode } from "react";

import { useCounter } from "./context/CounterContext";
import { useCounterText } from "./context/CounterContext";

type ChildrenType = {
  children: (num: number) => ReactNode;
};

const Counter = ({ children }: ChildrenType) => {
  //   const [count, setCount] = useState<number>(1);

  const { count, increment, decrement } = useCounter();
  const { text, handleTextInput } = useCounterText();

  return (
    <>
      <h1>{children(count)}</h1>
      <div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
      <input type="text" name="" id="" onChange={handleTextInput} />
      <h2>{text}</h2>
    </>
  );
};

export default Counter;
