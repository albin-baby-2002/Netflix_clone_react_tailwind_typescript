import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import Layout from "./components/Layout";
import Browse from "./pages/browse";

function App() {
  const router = createBrowserRouter(
    createRoutesFromChildren(
      <>
        <Route
          path="/"
          element={<p className=" bg-red-500 px-4 py-3 sm:px-2">default</p>}
        />

        <Route
          path="/login"
          element={<p className=" bg-red-500 px-4 py-3 sm:px-2">login</p>}
        />

        <Route
          path="/"
          element={<p className=" bg-red-500 px-4 py-3 sm:px-2">default</p>}
        />

        <Route path="/browse" element={<Layout />}>
          <Route index element={<Browse />} />
        </Route>

        <Route path="/latest" element={<Layout />}>
          <Route index element={<p> some </p>} />
        </Route>
      </>,
    ),
  );

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
