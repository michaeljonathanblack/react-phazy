import React, { Component } from 'react';
import PropTypes from 'prop-types';
import url from 'url';
import { random } from 'lodash';
import Phazy from './Phazy';

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
    baseUrl: '',
  };

  constructor(props) {
    super(props);
    const defaultBaseUrl = `img0${random(1, 9)}.mgo-images.com/image/thumbnail`;
    this.state = {
      baseUrl: this.props.baseUrl || defaultBaseUrl,
    };
  }

  getImageUrl() {
    const { id, quality, width, height } = this.props;

    const largeWidth = width * 2;
    const largeHeight = height * 2;
    const sizes = `${largeWidth}x${largeHeight}`;
    const cacheBuster = random(999999999);

    return url.format({
      host: this.state.baseUrl,
      query: {
        id,
        ql: quality,
        sizes,
        cacheBuster,
      },
    });
  }

  getPreviewUrl() {
    const { id, width, height } = this.props;

    const quality = 20;
    const previewSizeRatio = 1 / 10;
    const smallWidth = Math.round(width * previewSizeRatio);
    const smallHeight = Math.round(height * previewSizeRatio);
    const sizes = `${smallWidth}x${smallHeight}`;
    const cacheBuster = random(999999999);

    return url.format({
      host: this.state.baseUrl,
      query: {
        id,
        ql: quality,
        sizes,
        cacheBuster,
      },
    });
  }

  render() {
    const source = this.getImageUrl();
    const preview = this.getPreviewUrl();
    const { alt, width, height, id, quality, baseUrl, ...rest } = this.props;
    return (
      <Phazy
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
