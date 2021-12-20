import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Landing = lazy(() => import("../container/Landing"));
const Curiosity = lazy(() => import("../container/screens/Curiosity"));
const Spirit = lazy(() => import("../container/screens/Spirit"));
const Opportunity = lazy(() => import("../container/screens/Opportunity"));

const Loading = () => {
  return <div>Loading page...</div>;
};

function AppRouter(): JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={"/"} element={<Landing />}></Route>
        <Route path={"curiosity"} element={<Curiosity />}></Route>
        <Route path={"spirit"} element={<Spirit />}></Route>
        <Route path={"opportunity"} element={<Opportunity />}></Route>
      </Routes>
    </Suspense>
  );
}

export { AppRouter };
