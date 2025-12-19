import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Scanner from "./pages/Scanner";
import Inventory from "./pages/Inventory";
import ProductProfile from "./pages/ProductProfile";
import Reports from "./pages/Reports";
import RegisterExit from "./pages/RegisterExit";
import RegisterEntry from "./pages/RegisterEntry";
import NotRecognized from "./pages/NotRecognized";
import RegisterExitSuccess from "./pages/RegisterExitSuccess";
import RegisterEntrySuccess from "./pages/RegisterEntrySuccess";
import AdminProPainel from "./pages/AdminProPainel";
import EditProduct from "./pages/EditProduct";
import AdminProDashboard from "./pages/AdminProDashboard";
import ManualProductRegister from "./pages/ManualProductRegister";
import CreateKit from "./pages/CreateKit";
import ProductRecognitionResult from "./pages/ProductRecognitionResult";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/productProfile" element={<ProductProfile />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/registerExit" element={<RegisterExit />} />
        <Route path="/registerEntry" element={<RegisterEntry />} />
        <Route path="/notRecognized" element={<NotRecognized />} />
        <Route path="/registerExitSuccess" element={<RegisterExitSuccess />} />
        <Route
          path="/registerEntrySuccess"
          element={<RegisterEntrySuccess />}
        />
        <Route path="/adminProPainel" element={<AdminProPainel />} />
        <Route path="/editProduct" element={<EditProduct />} />
        <Route path="/adminProDashboard" element={<AdminProDashboard />} />
        <Route
          path="/manualProductRegister"
          element={<ManualProductRegister />}
        />
        <Route path="/createKit" element={<CreateKit />} />
        <Route
          path="/productRecognitionResult"
          element={<ProductRecognitionResult />}
        />
        <Route
          path="/recognition-result"
          element={<ProductRecognitionResult />}
        />
        <Route path="/register-entry" element={<RegisterEntry />} />
        <Route
          path="/register-entry-success"
          element={<RegisterEntrySuccess />}
        />
        <Route path="/register-exit" element={<RegisterExit />} />{" "}
        <Route path="/product-profile" element={<ProductProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
