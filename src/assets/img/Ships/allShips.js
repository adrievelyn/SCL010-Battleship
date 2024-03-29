import React, {Component} from 'react';
import ShipCss from './allShips.css';
import PropTypes from 'prop-types';

export default class AllShips extends Component {
  static get propTypes() {
    return {
      orientation: PropTypes.string,
      size: PropTypes.number,
      Xposition: PropTypes.number,
      Yposition: PropTypes.number
    };
  }


  static get defaultProps() {
    return {
      orientation: 'portrait',
      size: 30
    };
  }

  buildShip() {
    return [];
  }

  render() {
    const styles = {
      liPortrait: {
        width: `${this.props.size}px`,
        height: `${this.props.size}px`
      },

      liLandscape: {
        display: 'inline',
        listStyleType: 'none',
        width: `${this.props.size}px`,
        height: `${this.props.size}px`
      },

      imgPortrait: {
        width: `${this.props.size}px`,
        height: `${this.props.size}px`,
        backgroundColor: '#55ACEE'
      },

      imgLandscape: {
        width: `${this.props.size}px`,
        height: `${this.props.size}px`,
        WebkitTransform: 'rotate(-90deg)',
        MozTransform: 'rotate(-90deg)',
        OTransform: 'rotate(-90deg)',
        MsTransform: 'rotate(-90deg)',
        transform: 'rotate(-90deg)'
      }
    };

    const orientation = this.props.orientation;
    const shipStyle = {};
    const liStyle = orientation === 'portrait' ? styles.liPortrait : styles.liLandscape;
    const imgStyle = orientation === 'portrait' ? styles.imgPortrait : styles.imgLandscape;

    if (this.props.Xposition) {
      shipStyle.left = `${this.props.Xposition * this.props.size}px`;
    }

    if (this.props.Yposition) {
      shipStyle.top = `${this.props.Yposition * this.props.size}px`;
    }

    return (
      <div className={ShipCss.ship}>
        <ul style={shipStyle}>
          {this.buildShip().map((ship, key) => {
            return (
              <li key={key} style={liStyle}>
                <img style={imgStyle} src={ship} alt='ship'/>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
