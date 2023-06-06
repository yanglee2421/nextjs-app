import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistedStore } from "./store";

export function ReactRedux(props: React.PropsWithChildren) {
  const { children } = props;
  return (
    <Provider store={store}>
      {/* @ts-ignore */}
      <PersistGate persistor={persistedStore}>{children}</PersistGate>
    </Provider>
  );
}
