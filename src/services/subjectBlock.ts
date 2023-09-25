import { SubjectBlock } from "@/utils/responseTypes";
import { request } from "./request";

const getAll = (): Promise<Array<SubjectBlock>> =>
  new Promise((rs, rj) => {
    try {
      request()
        .get("/subject-block")
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });

const create = (req: { body: Partial<SubjectBlock> }) =>
  new Promise((rs, rj) => {
    try {
      request()
        .post("/subject-block", req.body)
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });

const update = (req: { params: { id: string }; body: Partial<SubjectBlock> }) =>
  new Promise((rs, rj) => {
    try {
      request()
        .put(`/subject-block/${req.params.id}`, req.body)
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
        .delete(`/subject-block/${req.params.id}`)
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });

const SubjectBlockService = {
  getAll,
  create,
  update,
  deleted,
};

export default SubjectBlockService;
