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

const getApplicationForAdmissionWithAHighSchoolScript = () =>
  new Promise((rs, rj) => {
    try {
      request()
        .get("/admission/application-admisison-high-school-script")
        .then(({ data }) => {
          rs(data?.data);
        });
    } catch (error) {
      rj(error);
    }
  });

const getApplicationForStraightAdmissionAndPriorityConsideration = () =>
  new Promise((rs, rj) => {
    try {
      request()
        .get(
          "/admission/application-for-straight-admission-and-priority-consideration"
        )
        .then(({ data }) => {
          rs(data?.data);
        });
    } catch (error) {
      rj(error);
    }
  });

const getApplicationForAdmissionConsiderationAccordingToTheCompetenceAssessmentTestResult =
  () =>
    new Promise((rs, rj) => {
      try {
        request()
          .get(
            "/admission/application-for-admission-consideration-according-to-the-competence-assessment-test-result"
          )
          .then(({ data }) => {
            rs(data?.data);
          });
      } catch (error) {
        rj(error);
      }
    });

const AdmissionService = {
  getAllAdmissionRegistration,
  getApplicationForAdmissionWithAHighSchoolScript,
  getApplicationForStraightAdmissionAndPriorityConsideration,
  getApplicationForAdmissionConsiderationAccordingToTheCompetenceAssessmentTestResult,
};

export default AdmissionService;
