import { Subject } from "@/utils/responseTypes";
import { request } from "./request";

const getAll = (): Promise<Array<Subject>> =>
  new Promise((rs, rj) => {
    try {
      request()
        .get("/subject")
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });

const create = (req: { body: Partial<Subject> }) =>
  new Promise((rs, rj) => {
    try {
      request()
        .post("/subject", req.body)
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
        .put(`/subject/${req.params.id}`, req.body)
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
        .delete(`/subject/${req.params.id}`)
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
};

export default SubjectService;
