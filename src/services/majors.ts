/* eslint-disable @typescript-eslint/no-explicit-any */
import { Majors } from "@/utils/responseTypes";
import { request } from "./request";

const getAll = (): Promise<Array<Majors>> =>
  new Promise((rs, rj) => {
    try {
      request()
        .get("/core/majors")
        .then(({ data }) => {
          rs(data?.data);
        });
    } catch (error) {
      rj(error);
    }
  });

const create = (req: { body: any }) =>
  new Promise((rs, rj) => {
    try {
      request()
        .post("/core/majors", req.body)
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });

const update = (req: { params: { id: string }; body: any }) =>
  new Promise((rs, rj) => {
    try {
      request()
        .put(`/core/majors/${req.params.id}`, req.body)
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
        .delete(`/core/majors/${req.params.id}`)
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });

const MajorsService = {
  getAll,
  create,
  update,
  deleted,
};

export default MajorsService;
