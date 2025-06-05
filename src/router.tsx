import { HashRouter as BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from "./views/Login/Login";
import Registro from "./views/Login/Registro";
import { ToastContainer } from "react-toastify";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Menu from "./components/Menu/Menu";
import Dashboard from "./views/Dashboard/Dashboard";
import InscripcionMaterias from "./views/Dashboard/Inscripcion/InscripcionMaterias";
import MisMaterias from "./views/Dashboard/materias/MisMaterias";
import RegistroMaterias from "./views/Dashboard/Inscripcion/RegistroMaterias";
import VerMaterias from "./views/Dashboard/materias/VerMaterias";
import { useAppStore } from "./store/UseAppStore";
import { RoleBasedRoute } from "./components/RoleBasedRoute";

import NotFound from "./views/NotFound/NotFound";


export default function AppRouter() {

  const { isAuthenticated } = useAppStore()



  return (
    <>
      <BrowserRouter>


        <Routes>
          <Route path="/" element={<Login />} index />
          <Route path="/register" element={<Registro />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route element={<RoleBasedRoute allowedRoles={['Estudiante']} />}>
              <Route path="inscripcion" element={<InscripcionMaterias />} />
              <Route path="mis-materias" element={<MisMaterias />} />
            </Route>


            <Route element={<RoleBasedRoute allowedRoles={['Profesor', 'Administrador']} />}>
              <Route path="registro-materias" element={<RegistroMaterias />} />
              <Route path="ver-materias" element={<VerMaterias />} />
            </Route>



          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}


