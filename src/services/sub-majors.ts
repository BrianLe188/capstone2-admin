/* eslint-disable @typescript-eslint/no-explicit-any */
import { Majors } from "@/utils/responseTypes";
import { request } from "./request";

const getAll = (): Promise<Array<Majors>> =>
  new Promise((rs, rj) => {
    try {
      request()
        .get("/core/submajors")
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
        .post("/core/submajors", req.body)
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
        .put(`/core/submajors/${req.params.id}`, req.body)
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
        .delete(`/core/submajors/${req.params.id}`)
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });

const importExcel = (req: { body: { data: unknown[] } }): Promise<string> =>
  new Promise((rs, rj) => {
    try {
      request()
        .post("/core/submajors/import", req.body)
        .then(({ data }) => {
          rs(data?.data);
        });
    } catch (error) {
      rj(error);
    }
  });

const SubMajorsService = {
  getAll,
  create,
  update,
  deleted,
  importExcel,
};

export default SubMajorsService;
