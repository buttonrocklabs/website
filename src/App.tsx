import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
