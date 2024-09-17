import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { default as ReactTopLoadingBar } from "react-top-loading-bar";
import { endTheBar } from "store/reducers/componentSlice.js";

function LoadingBar() {
  const dispatch = useDispatch();
  const loadingBar = useSelector((state) => state.loadingBar);
  return (
    <ReactTopLoadingBar
      // color="#52bf04"
      color="#E838BF"
      progress={loadingBar.progress}
      loaderSpeed={300}
      waitingTime={400}
      height={3}
      onLoaderFinished={() => dispatch(endTheBar())}
    />
  );
}

export default LoadingBar;
