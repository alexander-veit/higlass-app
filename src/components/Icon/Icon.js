import { PropTypes } from 'prop-types';
import React from 'react';

import icons, { WARNING } from '../../configs/icons';

import './Icon.scss';

const wrapHtml = html => ({ __html: html });

const getSvg = id => wrapHtml(icons[id] ? icons[id].svg : WARNING.svg);

const getFillRule = id => (icons[id] && icons[id].fillRule ?
  icons[id].fillRule : '');

const getViewBox = id => (icons[id] && icons[id].viewBox ?
  icons[id].viewBox : '0 0 16 16');

const convertId = id => (id ? id.replace(/-/g, '_').toUpperCase() : '');

const Icon = props => (
  <div className={`icon icon-${props.iconId}`} title={props.title}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="full-dim"
      viewBox={getViewBox(convertId(props.iconId))}
      fillRule={getFillRule(convertId(props.iconId))}
      dangerouslySetInnerHTML={getSvg(convertId(props.iconId))} />
  </div>
);

Icon.propTypes = {
  iconId: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default Icon;
