/* eslint-disable @typescript-eslint/no-explicit-any */
import { File } from "@/utils/responseTypes";
import { request } from "./request";

const getAll = (): Promise<Array<File>> =>
  new Promise((rs, rj) => {
    try {
      request()
        .get("/core/file")
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
        .post("/core/file", req.body)
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });

const update = (req: { params: { id: string }; body: Partial<File> }) =>
  new Promise((rs, rj) => {
    try {
      request()
        .put(`/core/file/${req.params.id}`, req.body)
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
        .delete(`/core/file/${req.params.id}`)
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });

const FilesService = {
  getAll,
  create,
  update,
  deleted,
};

export default FilesService;
