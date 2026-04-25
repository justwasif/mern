import {Post} from "../models/Post.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/APiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createproposal=asyncHandler(async(req,res)=>{
    const {content}=req.body;
    if(!content){
        throw new ApiError(400,"all entry are req");
    }
    const proposal=await Post.create({
        content,
    });
    res.status(201).json(new ApiResponse(201,proposal,"made proposal"));
});

const getproposalbyid=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const proposal=await Post.findById(id).populate("ownerId","username");
    if (!proposal) {
        throw new ApiError(404, "Proposal not found");
    }

    res.json(new ApiResponse(200, proposal));
})

const getAllPost=asyncHandler(async(req,res)=>{
    const post=await Post.find().populate("ownerId","username email").sort({createdAt:-1});
    res.json(new ApiResponse(200,post));
})

export {createproposal,getproposalbyid,getAllPost};