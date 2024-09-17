import HttpConnectionManager from "../HttpConnectionManager";

class AuthService extends HttpConnectionManager {
  constructor() {
    super();
    this.service = this.createService({ port: 8000 });
  }

  async logIn(user) {
    const response = await this.service.post("/auth/login", user);
    const token = response.data.access_token;
    localStorage.setItem("token", token);
    return response.data;
  }

  async getMe() {
    const response = await this.service.get("/auth/me");
    return response.data;
  }

  // eslint-disable-next-line class-methods-use-this
  logOut() {
    localStorage.removeItem("token");
  }

  async createUser(user) {
    const response = await this.service.post("/auth/register", user);
    return response.data;
  }
}

export default new AuthService();
