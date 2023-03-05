import Routes from "./routes/routes";
import { containerStyle, appStyle } from "./styles.js";

function App() {
  return (
    <div style={containerStyle}>
      <div className="form" style={appStyle}>
        <Routes />
      </div>
    </div>
  );
}

export default App;
