import { Rule } from "@/utils/responseTypes";
import { request } from "./request";

const getAll = (): Promise<Array<Rule>> =>
  new Promise((rs, rj) => {
    try {
      request()
        .get("/core/rules")
        .then(({ data }) => {
          rs(data?.data);
        });
    } catch (error) {
      rj(error);
    }
  });

const create = (req: { body: Partial<Rule> }) =>
  new Promise((rs, rj) => {
    try {
      request()
        .post("/core/rules", req.body)
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });

const update = (req: { params: { id: string }; body: Partial<Rule> }) =>
  new Promise((rs, rj) => {
    try {
      request()
        .put(`/core/rules/${req.params.id}`, req.body)
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
        .delete(`/core/rules/${req.params.id}`)
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });

const RuleService = {
  getAll,
  create,
  update,
  deleted,
};

export default RuleService;
