import { HashRouter as BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from "./views/Login/Login";
import Registro from "./views/Login/Registro";
import { ToastContainer } from "react-toastify";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Dashboard from "./views/Dashboard/Dashboard";
import CoursesInscription from "./views/Dashboard/Inscripcion/CoursesInscription";
import MyCourses from "./views/Dashboard/courses/MyCourses";
import ViewCourses from "./views/Dashboard/courses/ViewCourses";
import { useAppStore } from "./store/UseAppStore";
import { RoleBasedRoute } from "./components/RoleBasedRoute";

import NotFound from "./views/NotFound/NotFound";
import ViewAdmin from "./views/Dashboard/Admin/ViewAdmin";
import RegistrarClase from "./views/Dashboard/Inscripcion/RegistrarClase";
import StudentCourse from "./views/Dashboard/courses/StudentCourse";
import RegistroMateriasProfesores from "./views/Dashboard/Inscripcion/RegistroMateriasProfesores";
import ListTeacherCourses from "./views/Dashboard/courses/ListTeacherCourses";


export default function AppRouter() {

  const { isAuthenticated } = useAppStore()



  return (
    <>
      <>
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
              <Route path="inscripcion" element={<CoursesInscription />} />
              <Route path="mis-materias" element={<MyCourses />} />
              <Route path="mis-materias/:courseId" element={<StudentCourse />} />
            </Route>


            <Route element={<RoleBasedRoute allowedRoles={['Profesor']} />}>
              <Route path="registro-clase" element={<RegistrarClase />} />
              <Route path="ver-materias" element={<ViewCourses />} />
            </Route>


            <Route element={<RoleBasedRoute allowedRoles={['Administrador']} />}>
              {/* <Route index element={<ViewAdmin />} /> */}
              <Route path="registro-materias-profesores" element={<RegistroMateriasProfesores />} />
              <Route path="listar-materias-profesores" element={<ListTeacherCourses />} />
            </Route>



          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
      <ToastContainer />
    </>
  );
}


