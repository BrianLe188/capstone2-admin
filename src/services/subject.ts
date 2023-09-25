import { Subject } from "@/utils/responseTypes";
import { request } from "./request";

const getAll = (): Promise<Array<Subject>> =>
  new Promise((rs, rj) => {
    try {
      request()
        .get("/admission/subjects")
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
        .post("/admission/subjects", req.body)
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
        .put(`/admission/subjects/${req.params.id}`, req.body)
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
        .delete(`/admission/subjects/${req.params.id}`)
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
