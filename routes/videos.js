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
    channel: "Console Blog .js",
    image: "http://localhost:8080/static-files/images/followHeart.png",
    description: req.body.description,
    views: "11,762",
    likes: "75,232",
    duration: "26:52",
    video: "https://unit-3-project-api-0a5620414506.herokuapp.com/stream",
    timestamp: new Date().getTime(),
    comments: [
      {
        id: "6ff4314c-acde-4c91-a753-95cb7a366ee9",
        name: "Captain Hook",
        comment:
          "Your video is a visual feast! I feel I should not have wasted my time seeing videos on online platform and should be reading or playing some sport. Thanks for destroying my brain cells",
        likes: 12,
        timestamp: 1698383862000,
      },
      {
        id: "894b2ef9-640e-4d55-95ac-c65cfc39d693",
        name: "Daffy Duck",
        comment:
          "Quack Quack. While the cinematography is stunning, I'd appreciate which is actually relevant. The content was really nice, made me kinda fuzzy. The promotional adverts in your video were really fun",
        likes: 3,
        timestamp: 1698297462000,
      },
    ],
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
router.post("/:videoId/comments", (req, res) => {
  // get video from all videos
  console.log("i reached here");
  const videoId = req.params.videoId;
  const allVideosDetails = readAllVideoDetails();
  const selectedVideo = allVideosDetails.find((video) => video.id === videoId);
  const indexSelectedVideo = allVideosDetails.findIndex(
    (video) => video === selectedVideo
  );
  console.log(indexSelectedVideo);

  const newComment = {
    id: uniqid(),
    name: "Bugs Bunny",
    comment: req.body.comment,
    likes: 0,
    timestamp: new Date().getTime(),
  };

  console.log("new comment created on server");
  console.log(selectedVideo.comments);
  selectedVideo.comments.unshift(newComment);

  console.log(selectedVideo.comments);
  console.log("selectedVideo.comments List");

  allVideosDetails.splice(indexSelectedVideo, 1, selectedVideo);
  console.log(allVideosDetails);

  fs.writeFileSync(
    "./data/video-details.json",
    JSON.stringify(allVideosDetails)
  );
  fs.writeFileSync("./data/videos.json", JSON.stringify(allVideosDetails));

  res.status(201).json(newComment);
});

module.exports = router;
