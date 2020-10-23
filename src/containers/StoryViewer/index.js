import React, {Component} from "react";
import { connect } from "react-redux";
import Spinner from "react-spinner";

import {loadStory} from "../../actions";
import {StoryTimeline} from "../../components";
import {dummyLandmarks} from "../../utils/dummyData";
import config from "../../../config";

export class StoryViewer extends Component {
  constructor() {
    super()
    //let [story, setStory] = []
    this.state = { loading: true, story: []}
  }
  async componentDidMount() {
    //const {loadStory, currentStoryId} = this.props;
    let currentStoryId = this.props.match.params.storyId
    // console.log("Load story: " + loadStory)
    // console.log("Current ID: " + currentStoryId)
    // loadStory({
    //   storyId: currentStoryId
    // });

    const response = await fetch(`${config.apiEntry}/api/stories/${currentStoryId}`)
   // .then((response) => {
    //  console.log("RESPONSE " + response.json())
    //  return response.json();
   // })
   // .then((story) => {
    //  console.log("STORY: " + story)
      // dispatch(receiveStory({
      //   story
      // }));
     // this.setState({story: story})
   // });
   const json = await response.json()
   this.setState({ loading: false, story: json })
  // console.log("JSON: " + json)
  }
  render() {
   // const {loading, currentStory} = this.props;
   // console.log("State: " +  this.state)
    let currentStory = this.state.story//loadStory({storyId: this.props.match.params.storyId})
    //let loading = false
    //console.log(this.props)
    //console.log("Loading: " + loading)
    //console.log("Current story: " + currentStory)
    //console.log(this.props.match.params)
    if (this.state.loading) {
      return <div className="text-center lead">
        <p>Loading Story...</p>
        <Spinner />
      </div>;
    }

    return (
      <div>
        <StoryTimeline
          story={currentStory}
          landmarks={dummyLandmarks}/>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { storyId } = state.router.params;
  console.log(state.router.params)
  console.log("STORY ID: " + storyId)
  const story = state.story;
  if (story.loading) {
    return {
      currentStoryId: storyId,
      loading: story.loading
    };
  }
  return {
    currentStoryId: storyId,
    loading: story.loading,
    currentStory: story
  };
}

//export default connect(mapStateToProps, {
 // loadStory
//})(StoryViewer);