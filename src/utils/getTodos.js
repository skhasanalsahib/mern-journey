async function getTodos() {
  const res = await fetch(`http://localhost:3000/todos`);
  const data = await res.json();
  return data;
}

export default getTodos;

console.log(await getTodos());
console.log(`Hello`);
