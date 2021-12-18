import React, { FC, Suspense, useEffect, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "../container/Landing";

type AppRouterProps = {};

const Loading = () => {
  return <div>Loading...</div>;
};

const AppRouter: FC<AppRouterProps> = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={"/"} element={<Landing />}></Route>
        {/* <Route path="/users/:id" element={<div>Children</div>} /> */}
      </Routes>
    </Suspense>
  );
};

export { AppRouter };
