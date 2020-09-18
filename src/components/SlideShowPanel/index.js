import React, {Component} from "react";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import shouldPureComponentUpdate from "react-pure-render/function";

export default class SlideShowPanel extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const {images} = this.props;
    if (!images || images.size < 1) {
      return (<p className="text-center text-muted">No Data Yet</p>);
    }

    const slideShowImages = images.map(function (image) {
      const media = image.get("media");
      return media.merge({
        original: media.get("url"),
        thumbnail: media.get("url")
      });
    });

    return (
      <ImageGallery
        items={slideShowImages.toJS()}
        autoPlay={true}
        infinite={true}
        showBullets={true}
        slideDuration={250}
        slideInterval={10000}
        showThumbnails={false}/>
    );
  }
}
