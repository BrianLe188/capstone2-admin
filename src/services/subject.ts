import { Subject } from "@/utils/responseTypes";
import { request } from "./request";

const importExcel = (req: { body: { data: string[] } }): Promise<string> =>
  new Promise((rs, rj) => {
    try {
      request()
        .post("/core/subjects/import", req.body)
        .then(({ data }) => {
          rs(data?.data);
        });
    } catch (error) {
      rj(error);
    }
  });

const getAll = (): Promise<Array<Subject>> =>
  new Promise((rs, rj) => {
    try {
      request()
        .get("/core/subjects")
        .then(({ data }) => {
          rs(data?.data);
        });
    } catch (error) {
      rj(error);
    }
  });

const create = (req: { body: Partial<Subject> }) =>
  new Promise((rs, rj) => {
    try {
      request()
        .post("/core/subjects", req.body)
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });

const update = (req: { params: { id: string }; body: Partial<Subject> }) =>
  new Promise((rs, rj) => {
    try {
      request()
        .put(`/core/subjects/${req.params.id}`, req.body)
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
        .delete(`/core/subjects/${req.params.id}`)
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });

const SubjectService = {
  getAll,
  create,
  update,
  deleted,
  importExcel,
};

export default SubjectService;
