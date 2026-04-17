/* eslint-disable no-undef */
const Users  = require("../models/users.js");
const { s3, bucketName } = require('../config/s3.js');
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");

exports.getAllUser = async (req, res) => {
  try {
    const users = await Users.find();
    res.json({
      success: true,
      users: {
        users
      },
      message: 'Users retrieved successfully'
    })
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to retrieve users'
    });
  }
}

exports.getUserById = async (req, res) => {
  try {
    console.log("Retrieving user with ID:", req.params.id);
    const user = await Users.findOne({ clerkId: req.params.id });    

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    res.json({
      success: true,
      user,
      message: 'User retrieved successfully'
    });
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to retrieve user'
    });
  }
}

exports.sync = async (req, res) => {
  try {
    const { clerkId, email, name, photo } = req.body;
    console.log("Syncing user with data:", { clerkId, email, name , photo});

    const user = await Users.findOneAndUpdate(
      { clerkId: clerkId }, 
      { 
        clerkId: clerkId, 
        email: email, 
        name: name ,
        photo: photo
      },
      { upsert: true, new: true } 
    );

    res.json({
      success: true,
      user,
      message: 'User retrieved successfully'
    });
  } catch (error) {
    console.error("Errore sync:", error);
    res.status(500).json({ error: error.message });
  }
}

exports.uploadImage = async (req, res) => {
  try {
    if(!req.file){
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const { userId, title } = req.body;
    const imageUrl = req.file.location;

    const user = await Users.findOne({ clerkId: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const maxId = user.gallery.reduce((max, item) => (item.id > max ? item.id : max), 0)
    const newId = maxId + 1

    const newImage = {
      id: newId,
      title: title || "untitled",
      image: imageUrl
    }

    await Users.findOneAndUpdate(
      { clerkId: userId }, 
      { $push: { gallery: newImage } },
      { upsert: true, new: true } 
    );
    res.json({
      success: true,
      newImage,
      message: 'Image uploaded successfully'
    });

  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: error.message });
  }
}

exports.deleteImage =async (req, res) => {
  try {
    console.log("Deleting image with data:", req.body);
    const { userId, imageUrl, imageId } = req.body;

    const parts = imageUrl.split(`${bucketName}/`);
    const fileKey = parts.length > 1 ? decodeURIComponent(parts[1]) : null;
    console.log("Extracted file key:", fileKey);

    const deleteParams = {
      Bucket: bucketName,
      Key: fileKey
    }
    const command = new DeleteObjectCommand(deleteParams);
    await s3.send(command);

    await Users.findOneAndUpdate(
      { clerkId: userId },
      { $pull: { gallery: { id: imageId } } }, 
      { new: true }
    );
    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: error.message });

  }
}