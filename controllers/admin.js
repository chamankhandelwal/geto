import TryCatch from "../middlewares/TryCatch.js";
import { Course } from "../models/Courses.js";
import { Lecture } from "../models/Lectures.js";
import {rm} from "fs";
import {promisify} from "util";
import fs from "fs";
import { User } from "../models/User.js";
export const createCourse = TryCatch(async(req,res)=>{
    const {title,description,price,duration,category,createdBy} = req.body;
    const image = req.file;
    await Course.create({
        title,
        description,
        price,
        image:image?.path,
        duration,
        category,
        createdBy
    })
    res.json({
        message:"Course created successfully"
    })
})
export const addLecture = TryCatch(async(req,res)=>{
    const course = await Course.findById(req.params.id);
    if(!course){
        return res.status(404).json({
            message:"Course not found!"
        })
    }
    const {title,description} = req.body;
    const file = req.file; 
    const lecture = await Lecture.create({
        title,
        description,
        video:file?.path,
        course:course._id
    })
    res.status(201).json({
        message:"Lecture added!",
        lecture
    })
})
export const deleteLecture = TryCatch(async(req,res)=>{
    const lecture = await Lecture.findById(req.params.id);
    rm(lecture.video,()=>{
        console.log("Lecture deleted.")
    })
    await lecture.deleteOne();
    res.json({
        message:"Lecture deleted."
    })
})
const unlinkAsync = promisify(fs.unlink)
export const deleteCourse = TryCatch(async(req,res)=>{
    const course = await Course.findById(req.params.id);
    const lectures = await Lecture.find({course:course._id});
    await Promise.all(
        lectures.map(async(lecture)=>{
           await unlinkAsync(lecture.video);
            console.log("video deleted.")
        })
    ) 
    rm(course.image,()=>{
        console.log("thumbnail deleted")
    });
    await Lecture.find({course:req.params.id}).deleteMany();
    await course.deleteOne();
    await User.updateMany({},{$pull:{subscription:req.params.id}});
    res.json({
        message:"Course Deleted"
    })
})

export const allStats = TryCatch(async(req,res)=>{
    const totalCourses = (await Course.find()).length;
    const totalLectures = (await Lecture.find()).length;
    const totalUser = (await User.find()).length;
    const stats={
        totalCourses,
        totalLectures,
        totalUser
    }
    res.json({
        stats
    })
})

export const getAllUser = TryCatch(async(req,res)=>{
    const users = await User.find({_id:{$ne:req.user._id}}).select("-password");
    res.json({
        users
    })

})

export const updateRole = TryCatch(async(req,res)=>{
    const user = await User.findById(req.params.id);
    if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

    if(user.role === "user"){
        user.role = "admin";
        await user.save();
        return res.status(200).json({
            message:"Role update sucessfully."
        })
    }

    if(user.role === "admin"){
        user.role = "user";
        await user.save();
        return res.status(200).json({
            message:"Role update."
        })
    }
})