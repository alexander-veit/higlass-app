import PropTypes from 'prop-types';
import React from 'react';

// Components
import Icon from './Icon';

// Services
import pubSub from '../services/pub-sub';

// Styles
import './Dialog.scss';

class Dialog extends React.Component {
  constructor(props) {
    super(props);

    this.pubSubs = [];
  }

  componentWillMount() {
    this.pubSubs.push(
      pubSub.subscribe('keyup', this.keyUpHandler.bind(this))
    );
  }

  componentWillUnmount() {
    this.pubSubs.forEach(subscription => pubSub.unsubscribe(subscription));
    this.pubSubs = [];
  }

  render() {
    return (
      <div className='flex-c flex-a-c flex-jc-c full-dim dialog'>
        <div className='dialog-window'>
          <div className='flex-c flex-v flex-a-c dialog-content'>
            {(this.props.headline || this.props.icon) &&
              <header className='flex-c flex-a-c'>
              {this.props.icon &&
                <Icon iconId={this.props.icon} />
              }
              {this.props.headline &&
                <h2>{this.props.headline}</h2>
              }
              </header>
            }
            {typeof this.props.message === 'string' ? (
              <p className='dialog-message'>{this.props.message}</p>
            ) : (
              <div className='dialog-message'>{this.props.message}</div>
            )}
          </div>
          <div className='flex-c dialog-buttons'>
            {!this.props.resolveOnly &&
              <button
                className='column-1-2'
                onClick={this.props.reject}>
                {this.props.rejectText}
              </button>
            }
            <button
              className={this.props.resolveOnly ? 'column-1' : 'column-1-2'}
              onClick={this.props.resolve}>
              {this.props.resolveText}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------ Custom Methods -------------------------- */

  keyUpHandler(keyCode) {
    if (keyCode === 27) {  // ESC
      this.props.reject('Closed dialog on ESC');
    }
  }
}

Dialog.defaultProps = {
  rejectText: 'Cancel',
  resolveText: 'OK',
};

Dialog.propTypes = {
  headline: PropTypes.string,
  icon: PropTypes.string,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  reject: PropTypes.func,
  rejectText: PropTypes.string,
  resolve: PropTypes.func,
  resolveOnly: PropTypes.bool,
  resolveText: PropTypes.string,
};

export default Dialog;
