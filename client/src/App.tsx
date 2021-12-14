import { memo, VFC } from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Navigation } from './pages/partials/Navigation';
import {HomePage} from "./pages/HomePage";
import {PageNotFound} from "./pages/PageNotFound";
import {LoginPage} from "./pages/LoginPage";
import {LogoutPage} from "./pages/LogoutPage";
import {SignupPage} from "./pages/SignupPage";
import {UpdateProfilePage} from "./pages/UpdateProfilePage";
import { RegisterChild } from "./pages/RegisterChild";

export const  App: VFC = memo(() => {
  return (
    <>
      <Navigation />
      <Container id="App" className="py-3">
				<Routes>
					<Route
						path="/"
						element={
								<HomePage />
						}
					/>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/logout" element={<LogoutPage />} />
					<Route path="/signup" element={<SignupPage />} />
          <Route path="/update-profile" element={<UpdateProfilePage />} />
          <Route path="/register-child" element={<RegisterChild />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</Container>
    </>
  );
});

