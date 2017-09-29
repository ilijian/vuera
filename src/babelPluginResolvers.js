/* eslint-disable prefer-object-spread/prefer-object-spread */
import React from 'react'
import VueWrapper from './VueWrapper'

function makeVueElement (component, props) {
  return React.createElement(VueWrapper, Object.assign({ component }, props))
}

/**
 * This function gets imported by the babel plugin. It wraps a suspected React element and, if it
 * isn't a valid React element, wraps it into a Vue container.
 */
export function __vueraReactResolver (el, props) {
  if (typeof el === 'object' && !React.isValidElement(el)) {
    return makeVueElement(el, props)
  } else if (
    typeof el === 'function' &&
    el.prototype.constructor.super &&
    el.prototype.constructor.super.name.startsWith('Vue')
  ) {
    return makeVueElement(el, props)
  } else {
    return React.createElement(el, props)
  }
}