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

const SettingService = {
  importQATempate,
};

export default SettingService;
