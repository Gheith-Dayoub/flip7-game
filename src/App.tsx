import GameBoard from "./components/GameBoard";

function App() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <GameBoard />
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #eef2f7, #d9e2ec)",
    padding: 20,
  },
  container: {
    width: "100%",
    maxWidth: 900,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 32,
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  },
};

export default App;

