import { PanelResizeHandle } from "react-resizable-panels";

export default function ResizeHandle() {
  return (
    <PanelResizeHandle
      // className={styles.ResizeHandleOuter}
      style={{
        backgroundColor: "#2d2d2d",
        borderLeft: "0.5px solid black",
        borderRight: "0.5px solid black",
        width: "7px",
        opacity: "1",
        position: "relative",
        // background: "green",
      }}
    >
      <div
        style={{
          background: "#545454",
          width: "3px",
          height: "40px",
          position: "absolute",
          top: "40%",
          left: "30%",
          borderRadius: "20px",
        }}
      />
    </PanelResizeHandle>
  );
}
