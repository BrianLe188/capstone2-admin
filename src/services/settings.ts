import { request } from "./request";

const importQATempate = (req: { body: FormData }) =>
  new Promise((rs, rj) => {
    try {
      request()
        .post("/setting/import-qa-template", req.body)
        .then(({ data }) => {
          rs(data?.data);
        });
    } catch (error) {
      rj(error);
    }
  });

const syncRule = () =>
  new Promise((rs, rj) => {
    try {
      request()
        .get("/setting/sync-rule")
        .then(({ data }) => {
          rs(data?.data);
        });
    } catch (error) {
      rj(error);
    }
  });

const statisticSubmajor = () =>
  new Promise((rs, rj) => {
    try {
      request()
        .get("/setting/statistic-submajor")
        .then(({ data }) => {
          rs(data?.data);
        });
    } catch (error) {
      rj(error);
    }
  });

const generateSourceFromReport = () =>
  new Promise((rs, rj) => {
    try {
      request()
        .get("/setting/generate-source-from-report")
        .then(({ data }) => {
          rs(data?.data);
        });
    } catch (error) {
      rj(error);
    }
  });

const SettingService = {
  importQATempate,
  syncRule,
  statisticSubmajor,
  generateSourceFromReport,
};

export default SettingService;
