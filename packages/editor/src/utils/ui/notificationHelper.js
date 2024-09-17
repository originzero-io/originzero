// import cogoToast from "cogo-toast";
import toast from "react-hot-toast";

class Notification {
  constructor(component) {
    this.component = component;
  }

  success(message, options) {
    this.component.success(message, options);
  }

  error(message, options) {
    this.component.error(message, options);
  }

  warn(message) {
    this.component.success(message, {
      style: { border: " 1px solid #f0932b" },
      iconTheme: {
        primary: "#f0932b",
        secondary: "#FFFAEE",
      },
    });
  }
}

export default new Notification(toast);
