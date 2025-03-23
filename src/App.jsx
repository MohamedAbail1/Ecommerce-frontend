import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/dashboard/components/Sidebar";
import Dashboard from "./components/dashboard/pages/Dashboard";
import Users from "./components/dashboard/pages/Users";
import Products from "./components/dashboard/pages/Products";
import Categories from "./components/dashboard/pages/Categories";
import Orders from "./components/dashboard/pages/Orders";
import Login from "./components/dashboard/pages/Login";
import PrivateRoute from "./components/dashboard/components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="flex">
                <Sidebar />
                <div className="p-6 w-full bg-gray-100 min-h-screen">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/orders" element={<Orders />} />
                  </Routes>
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
