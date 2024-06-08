import { Outlet } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import toast, { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
