import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Pages/Dashboard";
import GoogleCallback from "./Pages/GoogleCallback";
import Editor from "./Pages/Editor/Editor";
import Payment from "./Pages/Payment";

import ProtectedRoute from "./routes/ProtectedRoutes";
import PublicRoute from "./routes/PublicRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<Home />} />

        
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

      
        <Route path="/auth/google/callback" element={<GoogleCallback />} />

        
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor/:id" element={<Editor />} />
          <Route path="/payment" element={<Payment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}