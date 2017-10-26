import React, { Component } from 'react';
import PropTypes from 'prop-types';

class winnerBigText extends Component {

  componentDidMount() {
    console.log(this.textElement);
  }

  render() {
    return (
      <a-entity
        id="textElement"
        ref={ (c) => { this.textElement = c; } }
        position="-4.843 5.899 0"
        animation__scale="property: scale; dir: alternate; dur: 500;
                    easing: easeInSine; loop: true; to: 1.6 1.2 1.6"
        text-geometry={ `
          bevelThickness: 0.01;
          bevelSize: 0.01;
          bevelEnabled: true;
          height: 0.1;
          size: 0.9;
          value: Winner ${this.props.text}
        ` }
      />

    );
  }
}

winnerBigText.defaultProps = {
  text: '',
};

winnerBigText.propTypes = {
  text: PropTypes.string,
};

export default winnerBigText;
