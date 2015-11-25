const momentTemplate = {
  mission: {
    id: 1,
    title: "Apollo 11",
    length: 7.031e8
  },
  startSlice: 7.031e8 / 2,
  endSlice: (7.031e8 / 2) + (20 * 1000),
  audioUrl: "https://aqueous-garden-9236.herokuapp.com/stream.mp3",
  body: "Testing!"
};

const storyTemplate = {
  description: "This is a description about the story that is told in the moments.",
  momentList: [{
    id: 1,
    title: "Moment 1",
    description: "This is a description for the first moment",
    time: "000:00:00"
  },{
    id: 2,
    title: "Moment 2",
    description: "This is a description for the second moment",
    time: "000:10:00"
  }]
};

export const dummyTranscripts = [
  {id: 1, name: "Niel", startTime: (7.031e8 / 2) + 1000, text: "One small step for man."},
  {id: 2, name: "Niel", startTime: (7.031e8 / 2) + 2000, text: "One giant step for mankind!"},
  {id: 3, name: "Buzz", startTime: (7.031e8 / 2) + 3000, text: "Don't worry, Woody. In just a few hours you'll be sitting around a campfire with Andy making delicious hot Schmoes."},
  {id: 4, name: "Buzz 2", startTime: (7.031e8 / 2) + 4000, text: "Quick, help me prop up Vegetable man here or we're done for!"},
  {id: 5, name: "Buzz", startTime: (7.031e8 / 2) + 5000, text: "Etch, Draw that man in a Chicken Suit."},
  {id: 6, name: "Rex", startTime: (7.031e8 / 2) + 6000, text: "It's the chicken man!"},
  {id: 7, name: "Buzz", startTime: (7.031e8 / 2) + 7000, text: "Woody once risked his life to save mine, and I couldn't call myself his friend if I wasn't willing to do the same. Now who's with me?"},
  {id: 8, name: "Rex", startTime: (7.031e8 / 2) + 8000, text: "But look at my little arms! I can't press the \"fire\" button and jump at the same time!"},
  {id: 9, name: "Buzz", startTime: (7.031e8 / 2) + 9000, text: "Good work, men. Two blocks down and only nineteen more to go."},
  {id: 10, name: "Niel", startTime: (7.031e8 / 2) + 10000, text: "One small step for man."},
  {id: 11, name: "Niel", startTime: (7.031e8 / 2) + 11000, text: "One giant step for mankind!"},
  {id: 12, name: "Buzz", startTime: (7.031e8 / 2) + 12000, text: "Don't worry, Woody. In just a few hours you'll be sitting around a campfire with Andy making delicious hot Schmoes."},
  {id: 13, name: "Buzz 2", startTime: (7.031e8 / 2) + 13000, text: "Quick, help me prop up Vegetable man here or we're done for!"},
  {id: 14, name: "Buzz", startTime: (7.031e8 / 2) + 14000, text: "Etch, Draw that man in a Chicken Suit."},
  {id: 15, name: "Rex", startTime: (7.031e8 / 2) + 15000, text: "It's the chicken man!"},
  {id: 16, name: "Buzz", startTime: (7.031e8 / 2) + 16000, text: "Woody once risked his life to save mine, and I couldn't call myself his friend if I wasn't willing to do the same. Now who's with me?"},
  {id: 17, name: "Rex", startTime: (7.031e8 / 2) + 17000, text: "But look at my little arms! I can't press the \"fire\" button and jump at the same time!"},
  {id: 18, name: "Buzz", startTime: (7.031e8 / 2) + 18000, text: "Good work, men. Two blocks down and only nineteen more to go."}
];

export const dummyMoments = {
  1: {
    ...momentTemplate,
    id: 1,
    title: "Moon Landing"
  },
  2: {
    ...momentTemplate,
    id: 2,
    title: "Blast Off",
    body: "Testing 2!"
  }
};

export const dummyStories = {
  1: {
    ...storyTemplate,
    id: 1,
    title: "Blast Off!"
  },
  2: {
    ...storyTemplate,
    id: 2,
    title: "Story 2"
  }
};


//negative ids to avoid collisions with moments
export const dummyLandmarks = [
  {
    time: "000:05:00",
    id: -1,
    title: "Blast Off!"
  },
  {
    time: "000:12:00",
    id: -2,
    title: "Orbit!"
  },
  {
    time: "000:30:00",
    id: -3,
    title: "Halfway!"
  }
];