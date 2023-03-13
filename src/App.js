import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from './pages/Account/Login';
import { RequireAuth } from './utils/RequireAuth';
import { EmpProfilePage } from './pages/Employee/EmpProfilePage';
import { TasksPage } from './pages/Employee/TasksPage';
import { TeamsPage } from './pages/Employee/TeamsPage';
import { RegisterPage } from './pages/Account/RegisterPage';
import { OneTeamPage } from './pages/Employee/OneTeamPage';
import { AllEpmlPage } from './pages/Employee/AllEmplPage';
import { CustProfilePage } from './pages/Customer/CustProfilePage';
import { ProjectsPage } from './pages/Customer/ProjectsPage';
import { OneProjectPage } from './pages/Customer/OneProjectPage';
import { StartPage } from './pages/Account/StartPage';
import { IdComparer } from './utils/IdComparer';
import { AdminProfilePage } from './pages/Admin/AdminProfilePage';
import { AdminProjectsPage } from './pages/Admin/AdminProjectsPage';
import { RequireAdmin } from './utils/RequireAdmin';
import { AdminOneProjectPage } from './pages/Admin/AdminOneProjectPage';
import { AdminAllTeamsPage } from './pages/Admin/AdminAllTeamsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/employee/profile/:id"
          element={
            <IdComparer>
              <EmpProfilePage/>
            </IdComparer>
          }
        />
        <Route
          path="/employee/tasks/:id"
          element={
            <IdComparer>
              <TasksPage/>
            </IdComparer>
          }
        />
        <Route
          path="/employee/teams/:id"
          element={
            <IdComparer>
              <TeamsPage/>
            </IdComparer>
          }
        />
        <Route
          path="/team/:id"
          element={
            <RequireAuth>
              <OneTeamPage/>
            </RequireAuth>
          }
        />
        <Route
          path="/employees"
          element={
            <RequireAuth>
              <AllEpmlPage/>
            </RequireAuth>
          }
        />

        <Route
          path="/customer/profile/:id"
          element={
            <IdComparer>
              <CustProfilePage/>
            </IdComparer>
          }
        />
        <Route
          path="/customer/projects/:id"
          element={
            <IdComparer>
              <ProjectsPage/>
            </IdComparer>
          }
        />
        <Route
          path="/customer/project/:id"
          element={
            <RequireAuth>
              <OneProjectPage/>
            </RequireAuth>
          }
        />
        <Route
          path="/admin/profile/:id"
          element={
            <RequireAdmin>
              <AdminProfilePage/>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <RequireAdmin>
              <AdminProjectsPage/>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/project/:id"
          element={
            <RequireAdmin>
              <AdminOneProjectPage/>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/teams"
          element={
            <RequireAdmin>
              <AdminAllTeamsPage/>
            </RequireAdmin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
