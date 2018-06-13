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
    width: null,
    height: null,
    quality: 70,
    baseUrl: '',
  };

  constructor(props) {
    super(props);
    const defaultBaseUrl = `img0${random(1, 9)}.mgo-images.com/image/thumbnail`;
    this.state = {
      baseUrl: this.props.baseUrl || defaultBaseUrl,
      width: props.width,
      height: props.height,
    };
    this.container = null;
    this.setContainerRef = element => {
      this.container = element;
    };
  }

  componentDidMount() {
    if (this.props.width && this.props.height) {
      return;
    }

    this.updateDimensions();

    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  getImageUrl() {
    const { id, quality } = this.props;
    const { width, height } = this.state;

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
    const { id } = this.props;
    const { width, height } = this.state;

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

  updateDimensions() {
    const element = this.container.parentElement;
    const cs = getComputedStyle(element);

    const paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    const paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);

    const borderX =
      parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
    const borderY =
      parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);

    // Element width and height minus padding and border
    const elementWidth = parseInt(element.offsetWidth - paddingX - borderX);
    const elementHeight = parseInt(element.offsetHeight - paddingY - borderY);

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      width: elementWidth,
      height: elementHeight,
    });
  }

  render() {
    const { alt, width, height, id, quality, baseUrl, ...rest } = this.props;
    const { width: widthComputed, height: heightComputed } = this.state;

    const source = this.getImageUrl();
    const preview = this.getPreviewUrl();
    const hasDimensions = widthComputed && heightComputed;
    return (
      <div className="lazy-poster" ref={this.setContainerRef}>
        {hasDimensions &&
          <Phazy
            source={source}
            preview={preview}
            alt={alt}
            width={widthComputed}
            height={heightComputed}
            {...rest}
          />}
      </div>
    );
  }
}

export default LazyPoster;
