import React from 'react';
import { string } from 'prop-types';
import { Image } from 'cloudinary-react';

class MozartImage extends React.Component {
  defaultProps = {
    crop: 'scale',
    height: '35',
    width: 'auto',
  };

  render() {
    const { imageName, crop, height, width } = this.props;
    return (
      <Image
        cloudName="evedes"
        publicId={`mozart-app/${imageName}.png`}
        height={height}
        width={width}
        crop={crop}
      />
    );
  }
}

MozartImage.propTypes = {
  imageName: string,
  crop: string,
  height: string,
  width: string,
};

export default MozartImage;
