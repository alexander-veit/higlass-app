import pubSub from './pub-sub';

// Custom event Handlers
const resize = event => pubSub.publish('resize', event);
const scroll = event => pubSub.publish(
  'scrollTop',
  event.target.scrollTop || document.body.scrollTop
);

/**
 * Supported event handlers.
 *
 * @type {object}
 */
const customEventHandlers = {
  orientationchange: resize,
  scroll,
};

/**
 * Get event handler.
 *
 * @param {string} eventName - Name of the event.
 * @return {function} Either a custom or generic event handler.
 */
const getEventHandler = (eventName) => {
  if (customEventHandlers[eventName]) {
    return customEventHandlers[eventName];
  }
  return event => pubSub.publish(eventName, event);
};

/**
 * Stack of elements with registered event listeners.
 *
 * @type {object}
 */
const registeredEls = {};

/**
 * Unregister an event listener.
 *
 * @param {string} event - Name of the event to stop listening from.
 * @param {object} element - DOM element which we listened to.
 */
const unregister = (event, element) => {
  if (!registeredEls[event] && registeredEls[event] !== element) { return; }

  registeredEls[event].removeEventListener(event, getEventHandler(event));

  registeredEls[event] = undefined;
  delete registeredEls[event];
};

/**
 * Register an event listener.
 *
 * @param {string} event - Name of the event to listen to.
 * @param {object} newElement - DOM element which to listen to.
 */
const register = (event, newElement) => {
  if (!newElement || registeredEls[event] === newElement) { return; }

  if (registeredEls[event]) {
    unregister(registeredEls[event]);
  }

  registeredEls[event] = newElement;
  registeredEls[event].addEventListener(event, getEventHandler(event));
};

/**
 * Public API.
 *
 * @type {object}
 */
const domEvent = {
  register,
  unregister,
};

export default domEvent;
