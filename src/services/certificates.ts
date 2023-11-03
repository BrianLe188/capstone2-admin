import { Certificate } from "@/utils/responseTypes";
import { request } from "./request";

const getAll = (): Promise<Array<Certificate>> =>
  new Promise((rs, rj) => {
    try {
      request()
        .get("/core/certificates")
        .then(({ data }) => {
          rs(data?.data);
        });
    } catch (error) {
      rj(error);
    }
  });

const create = (req: { body: Partial<Certificate> }) =>
  new Promise((rs, rj) => {
    try {
      request()
        .post("/core/certificates", req.body)
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });

const update = (req: { params: { id: string }; body: Partial<Certificate> }) =>
  new Promise((rs, rj) => {
    try {
      request()
        .put(`/core/certificates/${req.params.id}`, req.body)
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
        .delete(`/core/certificates/${req.params.id}`)
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });

const CertificateService = {
  getAll,
  create,
  update,
  deleted,
};

export default CertificateService;
