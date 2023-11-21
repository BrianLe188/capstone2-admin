/* eslint-disable @typescript-eslint/no-explicit-any */
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

const updateApplicationRegistration = (req: {
  params: { id: string };
  body: any;
}) =>
  new Promise((rs, rj) => {
    try {
      request()
        .put(
          `/admission/application-admisison-registration/update/${req.params.id}`,
          req.body
        )
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });

const updateApplicationForAdmissionConsiderationAccordingToTheCompetenceAssessmentTestResult =
  (req: { params: { id: string }; body: any }) =>
    new Promise((rs, rj) => {
      try {
        request()
          .put(
            `/admission/application-for-admission-consideration-according-to-the-competence-assessment-test-result/update/${req.params.id}`,
            req.body
          )
          .then(({ data }) => {
            rs(data);
          });
      } catch (error) {
        rj(error);
      }
    });
const updateApplicationForAdmissionWithAHighSchoolScript = (req: {
  params: { id: string };
  body: any;
}) =>
  new Promise((rs, rj) => {
    try {
      request()
        .put(
          `/admission/application-admisison-high-school-script/update/${req.params.id}`,
          req.body
        )
        .then(({ data }) => {
          rs(data);
        });
    } catch (error) {
      rj(error);
    }
  });
const updateApplicationForStraightAdmissionAndPriorityConsideration = (req: {
  params: { id: string };
  body: any;
}) =>
  new Promise((rs, rj) => {
    try {
      request()
        .put(
          `/admission/application-for-straight-admission-and-priority-consideration/update/${req.params.id}`,
          req.body
        )
        .then(({ data }) => {
          rs(data);
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
  updateApplicationRegistration,
  updateApplicationForAdmissionConsiderationAccordingToTheCompetenceAssessmentTestResult,
  updateApplicationForAdmissionWithAHighSchoolScript,
  updateApplicationForStraightAdmissionAndPriorityConsideration,
};

export default AdmissionService;
