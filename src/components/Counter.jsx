import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    // this will increment the count by 1
    // setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);

    // this will increment the count by 3
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
