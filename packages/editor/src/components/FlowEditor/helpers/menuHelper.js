import store from "index";
import {
  setElementContextMenu,
  setMultiSelectionContextMenu,
  setPanelContextMenu,
} from "store/reducers/menuSlice";

export const openPaneContextMenu = (event) => {
  event.preventDefault();
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const { clientX } = event;
  const { clientY } = event;
  // sağdan taşma
  if (windowWidth < clientX + 150) {
    console.log("sola dönecek");
    store.dispatch(
      setPanelContextMenu({
        state: true,
        x: event.clientX - 250,
        y: event.clientY,
      }),
    );
  }
  // soldan taşma
  else if (clientX < 200) {
    store.dispatch(
      setPanelContextMenu({
        state: true,
        x: event.clientX,
        y: event.clientY,
      }),
    );
  }
  // alttan taşma
  else if (windowHeight < clientY + 150) {
    store.dispatch(
      setPanelContextMenu({
        state: true,
        x: event.clientX,
        y: event.clientY - 400,
      }),
    );
  }
  // normal
  else {
    store.dispatch(
      setPanelContextMenu({
        state: true,
        x: event.clientX,
        y: event.clientY,
      }),
    );
  }
};

export const openMultiSelectionContextMenu = (event) => {
  event.preventDefault();
  store.dispatch(
    setMultiSelectionContextMenu({
      state: true,
      x: event.clientX,
      y: event.clientY,
    }),
  );
};

export const openElementContextMenu = (event, node) => {
  event.preventDefault();
  store.dispatch(
    setElementContextMenu({
      state: true,
      x: event.clientX,
      y: event.clientY,
      element: node,
    }),
  );
};
