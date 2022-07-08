import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/home.page";
import Layout from "@/components/layout";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
