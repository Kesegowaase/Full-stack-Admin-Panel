import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SideBar from "./components/SideBar";
import { useSelector } from "react-redux";
import { getLogin } from "./app/features/userSlice";
import TitlePage from "./pages/TitlePage";
import ConsumablePage from "./pages/ConsumablePage";
import StorePage from "./pages/StorePage";

function App() {

  const login = useSelector(getLogin);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/auth" element={<LoginPage />} />
          {login && <Route exact path="/titles" element={<SideBar><TitlePage /></SideBar>} />}
          {login && <Route exact path="/consumables" element={<SideBar><ConsumablePage /></SideBar>} />}
          {login && <Route exact path="/stores" element={<SideBar><StorePage /></SideBar>} />}
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
