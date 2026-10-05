import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import Start from "./pages/Start";
import SignalFire from "./pages/SignalFire";
import { captureAttribution } from "./lib/attribution";

function App() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/start" element={<Start />} />
          <Route path="/sf-137e1454fe33ace25e674267c66e5d16" element={<SignalFire />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
