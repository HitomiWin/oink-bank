import { memo, VFC } from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Navigation } from "./pages/partials/Navigation";
import { HomePage } from "./pages/HomePage";
import { PageNotFound } from "./pages/PageNotFound";
import { LoginPage } from "./pages/LoginPage";
import { LogoutPage } from "./pages/LogoutPage";
import { SignupPage } from "./pages/SignupPage";
import { UpdateProfilePage } from "./pages/UpdateProfilePage";
import { RegisterChild } from "./pages/RegisterChild";
import { EditChild } from "./pages/EditChild";
import { ChildHistoryList } from "./pages/ChildHistoryList";
import RequireAuth from "./components/RequireAuth";

export const App: VFC = memo(() => {
  return (
    <>
      <Navigation />
      <Container id="App" className="py-3">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* Protected routes */}
          <Route
            path="/"
            element={
              <RequireAuth redirectTo="/login">
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path="/update-profile"
            element={
              <RequireAuth redirectTo="/login">
                <UpdateProfilePage />
              </RequireAuth>
            }
          />
          <Route
            path="/register-child"
            element={
              <RequireAuth redirectTo="/login">
                <RegisterChild />
              </RequireAuth>
            }
          />
          <Route
            path="/edit-child/:id"
            element={
              <RequireAuth redirectTo="/login">
                <EditChild />
              </RequireAuth>
            }
          />
          <Route
            path="/child-history/:id"
            element={
              <RequireAuth redirectTo="/login">
                <ChildHistoryList />
              </RequireAuth>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
    </>
  );
});
