import notificationHelper from "utils/ui/notificationHelper";

const wrapWithTryCatch =
  (fn) =>
  async (...args) => {
    try {
      await fn(...args);
    } catch (error) {
      notificationHelper.error(error.message);
    }
  };

export default wrapWithTryCatch;
