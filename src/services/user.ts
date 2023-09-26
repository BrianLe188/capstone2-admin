import { User } from "@/utils/responseTypes";
import { request } from "./request";

const getAll = (): Promise<Array<User>> =>
  new Promise((rs, rj) => {
    try {
      request()
        .get("/admission/user")
        .then(({ data }) => {
          rs(data?.data);
        });
    } catch (error) {
      rj(error);
    }
  });

const create = (req: { body: Partial<User> }) =>
  new Promise((rs, rj) => {
    try {
      request()
        .post("/admission/user", req.body)
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
        .put(`/admission/user/${req.params.id}`, req.body)
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
        .delete(`/admission/user/${req.params.id}`)
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
