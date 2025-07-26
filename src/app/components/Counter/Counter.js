"use client";

import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount(count + 1);
  };

  if (typeof window === "undefined") {
    console.log("Running on server during build");
  } else {
    console.log("Running on client in browser");
  }

  return (
    <div>
      <h1>Current Value is : {count}</h1>
      <button onClick={handleIncrease}>Increase by 1</button>
    </div>
  );
};

export default Counter;
