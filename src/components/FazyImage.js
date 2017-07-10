import React from 'react';
import LazyLoad from 'react-lazyload';
import classNames from 'classnames';
import BlurImage from 'react-blur';

class FazyImage extends React.Component {
  constructor(props) {
    super();
    const id = 'MMV04EF52FB42EEDD801AE43A8BEB187BDE5';
    const width = 378 * 2;
    const height = 566 * 2;
    const quality = 100;
    const imageUrl = FazyImage.getImageUrl(id, width, height, quality);
    const previewUrl = FazyImage.getPreviewUrl(id, width, height);
    const alt = props.alt || 'A Fazy Image!';

    this.state = {
      someKey: 'someValue',
      alt,
      imageUrl,
      previewUrl,
      width,
      height
    };
  }

  static getImageUrl(id, width, height, quality) {
    const randomNumber = FazyImage.getRandomInt(0, 999999999);
    console.log('randomNumber: ' + JSON.stringify(randomNumber, null, '\t'));
    return `https://img06.mgo-images.com/image/thumbnail` +
      `?id=${id}` +
      `&ql=${quality}` + 
      `&sizes=${width}x${height}` +
      `&cacheBust=${randomNumber}`;
  }

  static getPreviewUrl(id, width, height) {
    const quality = 1;
    width = width * 0.05;
    height = height * 0.05;
    return `https://img06.mgo-images.com/image/thumbnail` +
      `?id=${id}` +
      `&ql=${quality}` + 
      `&sizes=${width}x${height}`;
  }

  static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  onLoadPreview() {
    this.setState({ isPreviewLoaded: true });
  }

  onLoadImage() {
    this.setState({ isImageLoaded: true });
  }

  render() {
    const width = this.state.width / 2;
    const height = this.state.height / 2;
    const widthPx = `${width}px`;
    const heightPx = `${height}px`;
    const placeholderPadding = height / width * 100;
    const placeholderPercent = `${placeholderPadding}%`;

    const previewClass = classNames('fazy__preview', { 'is-loaded': this.state.isPreviewLoaded });;
    const imageClass = classNames('fazy__image', { 'is-loaded': this.state.isImageLoaded });;

    return (
      <figure className="fazy">
        <div className="fazy__placeholder" style={{ maxWidth: widthPx, maxHeight: heightPx }}>
          <div className="fazy__placeholder-fill" style={{ paddingBottom: placeholderPercent }} />
          <LazyLoad height={height} offset={height} once>
            <div>
              <BlurImage
                className={previewClass}
                img={this.state.previewUrl}
                onLoadFunction={this.onLoadPreview.bind(this)}
                blurRadius={50}
              />
              <img
                className={imageClass}
                src={this.state.imageUrl}
                alt={this.state.alt}
                onLoad={this.onLoadImage.bind(this)}
              />
            </div>
          </LazyLoad>
        </div>
      </figure>
    );
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default FazyImage;
