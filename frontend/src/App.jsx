import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
        <Route path="/registerEntrySuccess" element={<RegisterEntrySuccess />} />
      </Routes>
    </Router>
  );
}

export default App;