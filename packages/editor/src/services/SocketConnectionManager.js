import store from "index";
import io from "socket.io-client";
import { beginTheBar, endTheBar } from "store/reducers/componentSlice";
import notification from "utils/ui/notificationHelper";

class SocketConnectionManager {
  constructor(config) {
    const { url = "", namespace = "", path = "", extraOptions } = config;

    this.url = url;
    this.namespace = namespace;
    this.path = path;
    this.extraOptions = extraOptions;
  }

  connect() {
    this.socket = io.connect(`${this.url}/${this.namespace}`, {
      transports: ["websocket"],
      path: this.path,
      reconnectionAttempts: 3,
      auth: { token: localStorage.getItem("token") },
      ...this.extraOptions,
    });
    this.socket.on("connect", () => {
      notification.success(`socket connected: ${this.url}`);
    });
    this.socket.on("connect_error", (err) => {
      notification.error(`Connection error: ${err.message} -> ${this.url}`);
    });
    this.socket.onAny((event, data) => {
      store.dispatch(beginTheBar());
      if (data.isError) {
        notification.error(`socket event error: ${data.errorMessage}`);
        throw new Error(`socket event error: ${event}`);
      }
      // notification.warn(`socket event: ${event}`);
      store.dispatch(endTheBar());
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default SocketConnectionManager;
