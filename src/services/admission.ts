import { request } from "./request";

const getAllAdmissionRegistration = () =>
  new Promise((rs, rj) => {
    try {
      request()
        .get("/admission/application-admisison-registration")
        .then(({ data }) => {
          rs(data?.data);
        });
    } catch (error) {
      rj(error);
    }
  });

const AdmissionService = {
  getAllAdmissionRegistration,
};

export default AdmissionService;
