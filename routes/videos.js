const express = require("express");
const router = express.Router();
const fs = require("fs");
const uniqid = require("uniqid");

// function to read all data from videos.json
function readAllVideos() {
  const allVideoData = fs.readFileSync("./data/videos.json");
  const allVideosParsed = JSON.parse(allVideoData);
  return allVideosParsed;
}

// function to read selected video details
function readAllVideoDetails() {
  const allVideosDetails = fs.readFileSync("./data/video-details.json");
  const allVideosDetailsParsed = JSON.parse(allVideosDetails);
  return allVideosDetailsParsed;
}

// route for all videos
router.get("/", (req, res) => {
  res.json(readAllVideos());
});

// route to individual video details
router.get("/:videoId", (req, res) => {
  const videoId = req.params.videoId;
  const allVideosDetails = readAllVideoDetails();
  const selectedVideo = allVideosDetails.find((video) => video.id === videoId);
  res.json(selectedVideo);
});

// post video to server
router.post("/", (req, res) => {
  const newVideo = {
    id: uniqid(),
    title: req.body.title,
    channel: req.body.channel,
    description: req.body.description,
    timestamp: new Date().getTime(),
  };

  // push into general videos file
  const allVideos = readAllVideos();
  allVideos.unshift(newVideo);
  fs.writeFileSync("./data/videos.json", JSON.stringify(allVideos));

  // push into videos details file
  const allVideosDetails = readAllVideoDetails();
  allVideosDetails.push(newVideo);
  fs.writeFileSync(
    "./data/video-details.json",
    JSON.stringify(allVideosDetails)
  );

  res.status(201).json(newVideo);
});

// route to post comments to individual video
router.post("/videos/:videoId/comments", (req, res) => {
  // get video from all videos
  const videoId = req.params.videoId;
  const allVideosDetails = readAllVideoDetails();
  const selectedVideo = allVideosDetails.find((video) => video.id === videoId);

  const newComment = {
    name: "Bugs Bunny",
    comment: req.body.comment,
    id: uniqid(),
    timestamp: new Date().getTime(),
  };

  // const allComments = readAllVideoDetails();
  console.log("i reached here");
  console.log(selectedVideo.comments);
  selectedVideo.comments.push(newComment);
  fs.writeFileSync("./data/video-details.json", selectedVideo.comments);

  res.status(201).json(newComment);
});

module.exports = router;
