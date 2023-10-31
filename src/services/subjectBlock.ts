import { SubjectBlock } from "@/utils/responseTypes";
import { request } from "./request";

const importExcel = (req: { body: { data: string[] } }): Promise<string> =>
  new Promise((rs, rj) => {
    try {
      request()
        .post("/core/subject-blocks/import", req.body)
        .then(({ data }) => {
          rs(data?.data);
        });
    } catch (error) {
      rj(error);
    }
  });

const importExcelSubjectIntoBlock = (req: {
  body: { data: string[] };
}): Promise<string> =>
  new Promise((rs, rj) => {
    try {
      request()
        .post("/core/subject-blocks/import-subject", req.body)
        .then(({ data }) => {
          rs(data?.data);
        });
    } catch (error) {
      rj(error);
    }
  });

const getAll = (): Promise<Array<SubjectBlock>> =>
  new Promise((rs, rj) => {
    try {
      request()
        .get("/core/subject-blocks")
        .then(({ data }) => {
          rs(data?.data);
        });
    } catch (error) {
      rj(error);
    }
  });

const create = (req: {
  body: Partial<{ name: string; subjects: Array<string> }>;
}) =>
  new Promise((rs, rj) => {
    try {
      request()
        .post("/core/subject-blocks", req.body)
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });

const update = (req: {
  params: { id: string };
  body: Partial<{ name: string; subjects: Array<string> }>;
}) =>
  new Promise((rs, rj) => {
    try {
      request()
        .put(`/core/subject-blocks/${req.params.id}`, req.body)
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
        .delete(`/core/subject-blocks/${req.params.id}`)
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
  importExcel,
  importExcelSubjectIntoBlock,
};

export default SubjectBlockService;
