import { Route, Routes } from "react-router-dom";
import "./globals.css";
import SigninForm from "./_auth/forms/SigninForm";
import {
  // AllUsers,
  // CreatePost,
  // Explore,
  Home,
  // Profile,
  // Saved,
  // UpdatePost,
  // UpdateProfile,
} from "./_root/pages/";
import SignUpForm from "./_auth/forms/SignUpForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster";
// import PostDetails from "./_root/pages/PostDetails";
import ProtectedRout from "./components/shared/ProtectedRoute";

function App() {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="sign-in" element={<SigninForm />} />
          <Route path="sign-up" element={<SignUpForm />} />
        </Route>
        <Route
          element={
            <ProtectedRout>
              <RootLayout />
            </ProtectedRout>
          }
        >
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
