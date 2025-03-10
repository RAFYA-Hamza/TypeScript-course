import { useState } from "react";

import Counter from "./Components/Counter";
import Heading from "./Components/Heading";
import Section from "./Components/Section";
import List from "./Components/List";

function App() {
  const [count, setCount] = useState<number>(1);

  return (
    <>
      <Heading title={"Hello world!"} />
      <Section title="Different title">This is my Scetion</Section>
      <Counter setCount={setCount}>Counter is: {count}</Counter>
      <List
        items={["Coffee", "Tacos", "Code"]}
        render={(item: string) => <span className="bold">{item}</span>}
      />
    </>
  );
}

export default App;
