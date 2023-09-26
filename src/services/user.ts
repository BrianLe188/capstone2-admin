import { User } from "@/utils/responseTypes";
import { request } from "./request";
import { EROLE } from "@/utils/enums";

const getAll = (): Promise<Array<User>> =>
  new Promise((rs, rj) => {
    try {
      request()
        .get("/auth/users")
        .then(({ data }) => {
          rs(data?.data);
        });
    } catch (error) {
      rj(error);
    }
  });

const create = (req: {
  body: {
    user: Partial<User>;
    role: {
      name: EROLE;
    };
  };
}) =>
  new Promise((rs, rj) => {
    try {
      request()
        .post("/auth/register", req.body)
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });

const update = (req: { params: { id: string }; body: Partial<User> }) =>
  new Promise((rs, rj) => {
    try {
      request()
        .put(`/auth/users/${req.params.id}`, req.body)
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });

const deleted = (req: { params: { id: string } }) =>
  new Promise((rs, rj) => {
    try {
      request()
        .delete(`/auth/users/${req.params.id}`)
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });

const UserService = {
  getAll,
  create,
  update,
  deleted,
};

export default UserService;
