fetch('http://localhost:9200/captions/_doc', {
  body: JSON.stringify({
    videoId: 'video1',
    captions: {
        "startTime": 120,
        "endTime": 4480,
        "duration": 4360,
        "textSegments": [
          {
            "utf8": "I",
            "offsetTime": 0
          },
          {
            "utf8": " just",
            "offsetTime": 160
          },
          {
            "utf8": " dropped",
            "offsetTime": 320
          },
          {
            "utf8": " off",
            "offsetTime": 679
          },
          {
            "utf8": " five",
            "offsetTime": 959
          },
          {
            "utf8": " men",
            "offsetTime": 1240
          },
          {
            "utf8": " and",
            "offsetTime": 1800
          },
          {
            "utf8": " five",
            "offsetTime": 2039
          },
          {
            "utf8": "women",
            "offsetTime": 0
          },
          {
            "utf8": " in",
            "offsetTime": 439
          },
          {
            "utf8": " the",
            "offsetTime": 560
          },
          {
            "utf8": " middle",
            "offsetTime": 840
          },
          {
            "utf8": " of",
            "offsetTime": 1160
          },
          {
            "utf8": " the",
            "offsetTime": 1279
          },
          {
            "utf8": " Wilderness",
            "offsetTime": 1439
          }
        ]
      },
      // {
      //   "startTime": 2440,
      //   "endTime": 6399,
      //   "duration": 3959,
      //   "textSegments": [
      //     {
      //       "utf8": "women",
      //       "offsetTime": 0
      //     },
      //     {
      //       "utf8": " in",
      //       "offsetTime": 439
      //     },
      //     {
      //       "utf8": " the",
      //       "offsetTime": 560
      //     },
      //     {
      //       "utf8": " middle",
      //       "offsetTime": 840
      //     },
      //     {
      //       "utf8": " of",
      //       "offsetTime": 1160
      //     },
      //     {
      //       "utf8": " the",
      //       "offsetTime": 1279
      //     },
      //     {
      //       "utf8": " Wilderness",
      //       "offsetTime": 1439
      //     }
      //   ]
      // }
  }),
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
}).then(res => res.json()).then(console.log);