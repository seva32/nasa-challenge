import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Landing = lazy(() => import("../container/Landing"));

const Loading = () => {
  return <div>Loading page...</div>;
};

function AppRouter(): JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={"/"} element={<Landing />}></Route>
      </Routes>
    </Suspense>
  );
}

export { AppRouter };
