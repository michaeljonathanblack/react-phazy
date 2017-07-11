import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FazyImage from './FazyImage';

class LazyPoster extends Component {
  static propTypes = {
    alt: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    quality: PropTypes.number,
    baseUrl: PropTypes.string,
  };

  static defaultProps = {
    width: 378 / 2,
    height: 566 / 2,
    quality: 70,
    baseUrl: `https://img0${LazyPoster.getDomainIndex()}.mgo-images.com/image/thumbnail`,
  };

  static getDomainIndex() {
    return LazyPoster.getRandomInt(0, 10);
  }

  static getRandomInt(min, max) {
    const minCeiling = Math.ceil(min);
    const maxFloor = Math.floor(max);
    // The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (maxFloor - minCeiling)) + minCeiling;
  }

  static domainIndex = LazyPoster.getRandomInt(0, 10);

  getImageUrl() {
    const { id, quality, width, height, baseUrl } = this.props;
    const cacheBuster = LazyPoster.getRandomInt(0, 999999999);
    return (
      `${baseUrl}?id=${id}` +
      `&ql=${quality}` +
      `&sizes=${width * 2}x${height * 2}` +
      `&cacheBuster=${cacheBuster}`
    );
  }

  getPreviewUrl() {
    const { id, width, height, baseUrl } = this.props;
    const quality = 20;
    const previewSizeRatio = 1 / 10;
    const smallWidth = width * previewSizeRatio;
    const smallHeight = height * previewSizeRatio;
    return (
      `${baseUrl}?id=${id}` +
      `&ql=${quality}` +
      `&sizes=${smallWidth}x${smallHeight}`
    );
  }

  render() {
    const source = this.getImageUrl();
    const preview = this.getPreviewUrl();
    const { alt, width, height, id, quality, baseUrl, ...rest } = this.props;
    return (
      <FazyImage
        source={source}
        preview={preview}
        alt={alt}
        width={width}
        height={height}
        {...rest}
      />
    );
  }
}

export default LazyPoster;
