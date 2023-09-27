import { SubjectBlock } from "@/utils/responseTypes";
import { request } from "./request";

const getAll = (): Promise<Array<SubjectBlock>> =>
  new Promise((rs, rj) => {
    try {
      request()
        .get("/admission/subject-blocks")
        .then(({ data }) => {
          rs(data?.data);
        });
    } catch (error) {
      rj(error);
    }
  });

const create = (req: { body: Partial<SubjectBlock> }) =>
  new Promise((rs, rj) => {
    try {
      request()
        .post("/admission/subject-blocks", req.body)
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
        .put(`/admission/subject-blocks/${req.params.id}`, req.body)
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
        .delete(`/admission/subject-blocks/${req.params.id}`)
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
