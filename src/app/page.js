import styles from "./page.module.css";
import Counter from "./components/Counter/Counter";

export default function Home() {
  return (
    <div className={styles.page}>
      <Counter />
    </div>
  );
}
