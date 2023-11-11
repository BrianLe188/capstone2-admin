import { request } from "./request";

const login = (req: {
  body: { email: string; password: string };
}): Promise<{ accessToken: string }> =>
  new Promise((rs, rj) => {
    request()
      .post("/auth/login", req.body)
      .then(({ data }) => {
        rs(data);
      })
      .catch((error) => {
        rj(error);
      });
  });

const authService = {
  login,
};

export default authService;
