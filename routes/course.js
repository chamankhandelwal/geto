import express from "express";
import { checkout, fetchLecture, fetchLectures, getAllCourses, getMyCourse, getSingleCourse, paymentVerification } from "../controllers/course.js";
import { isAuth } from "../middlewares/isAuth.js";
const router = express.Router();
router.get("/course/all",getAllCourses);
router.get("/course/:id",getSingleCourse);
router.get("/lectures/:id",isAuth,fetchLectures);
router.get("/lecture/:id",isAuth,fetchLecture);
router.get("/mycourse",isAuth,getMyCourse);
router.post("/course/checkout/:id",isAuth,checkout);
router.post("/verification/:id",isAuth,paymentVerification);
export {router as coursesRoute}