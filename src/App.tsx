import { Route, Routes } from "react-router-dom";
import "./globals.css";
import SigninForm from "./_auth/forms/SigninForm";
import {
  AllUsers,
  CreatePost,
  Explore,
  Home,
  Profile,
  Saved,
  UpdatePost,
  UpdateProfile,
} from "./_root/pages/";
import SignUpForm from "./_auth/forms/SignUpForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster";
import PostDetails from "./_root/pages/PostDetails";

function App() {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="sign-in" element={<SigninForm />} />
          <Route path="sign-up" element={<SignUpForm />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<UpdatePost />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
