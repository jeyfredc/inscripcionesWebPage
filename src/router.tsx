import { HashRouter as BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/Login/Login";
import Registro from "./views/Login/Registro";

export default function AppRouter() {




  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Login />} index />
          <Route path="/register" element={<Registro/>} />
{/*           <Route path="/register" element={<RegisterUser />} />
        <Route path="/books" element={
          
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Menu />  
            <BookPage />
          </ProtectedRoute>
          
          } /> */}
{/*           <Route 
            path="/books/:book_Id" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Menu />
                <DetailBook />
              </ProtectedRoute>
            } 
          /> */}

        </Routes>
      </BrowserRouter>
    </>
  );
}
