import store from "index";
import { makeMeOnline } from "store/reducers/authSlice";
import { editUser } from "store/reducers/userSlice";
import notificationHelper from "utils/ui/notificationHelper";

const userInitialListener = (userEvent) => {
  userEvent.setOnlineUser("MAKE_ME_ONLINE");
  userEvent.onOnlineUser((data) => {
    const { auth } = store.getState();
    if (auth._id !== data._id) {
      store.dispatch(editUser(data));
      notificationHelper.success(`${data.username} oturum açtı`);
    } else {
      store.dispatch(editUser(data));
      store.dispatch(makeMeOnline(data));
    }
  });
  userEvent.onOfflineUser((data) => {
    const { auth } = store.getState();
    if (auth._id !== data._id) {
      store.dispatch(editUser(data));
      notificationHelper.warn(`${data.username} oturumu kapadı`);
    } else alert("Oturum başka bir tabde açık");
  });
};

export default userInitialListener;
