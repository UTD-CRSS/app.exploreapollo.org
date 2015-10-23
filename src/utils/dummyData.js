const momentTemplate = {
  mission: {
    id: 1,
    title: "Apollo 11",
    length: 7.031e8
  },
  startSlice: 7.031e8 / 2,
  endSlice: 6e8,
  audioUrl: "https://aqueous-garden-9236.herokuapp.com/stream.mp3",
  transcripts: [
    {id: 1, name: "Niel", text: "One small step for man."},
    {id: 2, name: "Niel", text: "One giant step for mankind!"},
    {id: 3, name: "Buzz", text: "Don't worry, Woody. In just a few hours you'll be sitting around a campfire with Andy making delicious hot Schmoes."},
    {id: 4, name: "Buzz 2", text: "Quick, help me prop up Vegetable man here or we're done for!"},
    {id: 5, name: "Buzz", text: "Etch, Draw that man in a Chicken Suit."},
    {id: 6, name: "Rex", text: "It's the chicken man!"},
    {id: 7, name: "Buzz", text: "Woody once risked his life to save mine, and I couldn't call myself his friend if I wasn't willing to do the same. Now who's with me?"},
    {id: 8, name: "Rex", text: "But look at my little arms! I can't press the \"fire\" button and jump at the same time!"},
    {id: 9, name: "Buzz", text: "Good work, men. Two blocks down and only nineteen more to go."},
    {id: 10, name: "Niel", text: "One small step for man."},
    {id: 11, name: "Niel", text: "One giant step for mankind!"},
    {id: 12, name: "Buzz", text: "Don't worry, Woody. In just a few hours you'll be sitting around a campfire with Andy making delicious hot Schmoes."},
    {id: 13, name: "Buzz 2", text: "Quick, help me prop up Vegetable man here or we're done for!"},
    {id: 14, name: "Buzz", text: "Etch, Draw that man in a Chicken Suit."},
    {id: 15, name: "Rex", text: "It's the chicken man!"},
    {id: 16, name: "Buzz", text: "Woody once risked his life to save mine, and I couldn't call myself his friend if I wasn't willing to do the same. Now who's with me?"},
    {id: 17, name: "Rex", text: "But look at my little arms! I can't press the \"fire\" button and jump at the same time!"},
    {id: 18, name: "Buzz", text: "Good work, men. Two blocks down and only nineteen more to go."}
  ],
  body: "Testing!"
}

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
