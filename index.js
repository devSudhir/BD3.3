const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));

const watchList = [
  {
    videoId: 1,
    title: 'Javascript Tutorial',
    watched: false,
    url: 'https://youtube/shorturl1',
  },
  {
    videoId: 2,
    title: 'Node js Tutorial',
    watched: true,
    url: 'https://youtube/shorturl2',
  },
  {
    videoId: 3,
    title: 'React js Tutorial',
    watched: false,
    url: 'https://youtube/shorturl3',
  },
];

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

function updateWatchStatus(watchList, videoId, watched) {
  for (let i = 0; i < watchList.length; i++) {
    if (watchList[i].videoId === videoId) {
      watchList[i].watched = watched === 'true';
      break;
    }
  }
  return watchList;
}

app.get('/watchlist/update', (req, res) => {
  const { videoId, watched } = req.query;
  res.json(updateWatchStatus(watchList, parseFloat(videoId), watched));
});

function updateAllWatchStatus(watchList, watched) {
  for (let i = 0; i < watchList.length; i++) {
    watchList[i].watched = watched === 'true';
  }
  return watchList;
}

app.get('/watchlist/update-all', (req, res) => {
  const { watched } = req.query;
  res.json(updateAllWatchStatus(watchList, watched));
});

function deleteVideoBasedOnVideoId(watchList, videoId) {
  const result = watchList.filter((ele) => ele.videoId != videoId);
  return result;
}

app.get('/watchlist/delete', (req, res) => {
  const { videoId } = req.query;
  res.json(deleteVideoBasedOnVideoId(watchList, videoId));
});

function deleteWatchedVideos(watchList) {
  const result = watchList.filter((ele) => ele.watched === false);
  return result;
}

app.get('/watchlist/delete-watched', (req, res) => {
  res.json(deleteWatchedVideos(watchList));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
