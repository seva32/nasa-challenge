import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { AppRouter } from "./components/AppRouter";
import { ApplicationState, configureAppStore } from "./store/store";
import { initialState as initialNasaData } from "./store/reducers/nasaDataReducer";
import { ErrorBoundary } from "./components";

const initialState: ApplicationState = {
  nasaData: initialNasaData,
};

const store = configureAppStore(initialState);

export function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <AppRouter />
        </Router>
      </ErrorBoundary>
    </Provider>
  );
}
