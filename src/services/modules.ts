import { Module } from "@/utils/responseTypes";
import { request } from "./request";

const getAll = (): Promise<Array<Module>> =>
  new Promise((rs, rj) => {
    try {
      request()
        .get("/core/modules")
        .then(({ data }) => {
          rs(data?.data);
        });
    } catch (error) {
      rj(error);
    }
  });

const create = (req: { body: Partial<Module> }) =>
  new Promise((rs, rj) => {
    try {
      request()
        .post("/core/modules", req.body)
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });

const update = (req: { params: { id: string }; body: Partial<Module> }) =>
  new Promise((rs, rj) => {
    try {
      request()
        .put(`/core/modules/${req.params.id}`, req.body)
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
        .delete(`/core/modules/${req.params.id}`)
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });

const ModuleService = {
  getAll,
  create,
  update,
  deleted,
};

export default ModuleService;
