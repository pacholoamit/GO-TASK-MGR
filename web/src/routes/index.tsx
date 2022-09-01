import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/home.page";
import AuthPage from "@/pages/auth.page";
import Layout from "@/components/layout";
import ProjectPage from "@/features/projects/pages/project.page";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
