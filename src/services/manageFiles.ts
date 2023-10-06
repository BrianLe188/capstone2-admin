/* eslint-disable @typescript-eslint/no-explicit-any */
import { File } from "@/utils/responseTypes";
import { request } from "./request";

const getAll = (): Promise<Array<File>> =>
  new Promise((rs, rj) => {
    try {
      request()
        .get("/core/files")
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
        .post("/core/files", req.body)
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });

const update = (req: { params: { id: string }; body: FormData }) =>
  new Promise((rs, rj) => {
    try {
      request()
        .put(`/core/files/${req.params.id}`, req.body)
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
        .delete(`/core/files/${req.params.id}`)
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
