import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Shows from "./pages/Shows";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
import Search from "./pages/Search";
import Details from "./pages/Details";
import { AuthProvider } from "./context/authProvider";
import { Toaster } from "sonner";

const myRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tv" element={<Shows />} />
      <Route path="/search" element={<Search />} />
      <Route path="/:type/:id" element={<Details />} />
    </Route>
  )
);
const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Toaster duration={3000} richColors position="bottom-right" />
        <RouterProvider router={myRoutes} />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
