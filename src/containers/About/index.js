import React, {Component} from "react";
import ImageGallery from "react-image-gallery";

const before = {
  right: "0.5em",
  marginLeft: "-50%",
  backgroundColor: "#FFF",
  content: "",
  display: "inline-block",
  height: "1px",
  position: "relative",
  verticalAlign: "middle",
  width: "50%"
};
const header = {
  fontSize: "2.0em",
  fontWeight: "bold",
  overflow: "hidden",
  textAlign: "center"
};
const after = {
  left: "0.5em",
  marginRight: "-50%",
  backgroundColor: "#FFF",
  content: "",
  display: "inline-block",
  height: "1px",
  position: "relative",
  verticalAlign: "middle",
  width: "50%"
};
const body = {
  fontSize: "0.5em",
  fontWeight: "normal",
  textAlign: "left"
};

export class Mission extends Component {
  render() {

    return (
      <div>
        <div className="col-sm-8 col-sm-offset-2" style={header}>
          <span style={before}/>
          <span>OUR MISSION</span>
          <span style={after}/>
          <p style={body}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus odio magna, sagittis eu vulputate nec, suscipit sed massa. Cras sed lacinia enim, id maximus arcu. Nam eu imperdiet elit. Maecenas eu tellus odio. Suspendisse finibus commodo egestas. Aliquam vel neque cursus ex ullamcorper sollicitudin. Vestibulum posuere eu lorem dapibus suscipit. Nullam lacinia sapien elit. Maecenas quis nunc nec dui ullamcorper ornare. Aliquam ornare iaculis egestas. Integer egestas dui eu ante gravida, vel molestie ante dignissim. Aliquam elementum at nisi rhoncus malesuada.</p>
        </div>
      </div>
    );
  }
}

export class Crew extends Component {
  render() {
    //TODO real images go here
    const images = [
      {original: "http://lorempixel.com/1000/600/cats/1/",
      description: "Lorem ipsum dolor sit amet"},
      {original: "http://lorempixel.com/1000/600/cats/2/",
      description: "Lorem ipsum dolor sit amet"},
      {original: "http://lorempixel.com/1000/600/cats/3/",
      description: "Lorem ipsum dolor sit amet"},
      {original: "http://lorempixel.com/1000/600/cats/4/",
      description: "Lorem ipsum dolor sit amet"},
      {original: "http://lorempixel.com/1000/600/cats/5/",
      description: "Lorem ipsum dolor sit amet"},
      {original: "http://lorempixel.com/1000/600/cats/6/",
      description: "Lorem ipsum dolor sit amet"}
    ];

    //TODO fullscreen button doesn't show??
    //TODO element doesn't scale with browser zoom. Could cause problems on small displays
    return (
      <div>
        <div className="col-sm-8 col-sm-offset-2" style={header}>
          <span style={before}/>
          <span>THE CREW</span>
          <span style={after}/>
        </div>
        <div className="col-sm-6 col-sm-offset-3">
          <ImageGallery
            items={images}
            infinite={true}
            showBullets={true}
            showFullscreenButton={true}
            showThumbnails={false}
            autoPlay={true}
            slideDuration={250}
            slideInterval={10000}/>
        </div>
      </div>
    );
  }
}

export default class About extends Component {
  render() {
    return (
      <div>
        <Mission/>
        <Crew/>
      </div>
    );
  }
}
