import { AnimateFunctionType, ScrollSettings, ScrollState } from './types'

const defaultSettings: ScrollSettings = {
  wrapperId: 'butter',
  wrapperDamper: 0.03,
  cancelOnTouch: false,
}

let state: ScrollState = {
  wrapper: null,
  wrapperOffset: 0,
  animateId: null,
  resizing: false,
  active: false,
  wrapperHeight: 0,
  bodyHeight: 0,
}

const init = (options?: Partial<ScrollSettings>): void => {
  try {
    const settings: ScrollSettings = validateOptions(
      options || {},
      defaultSettings,
    )
  
    const targetElement = document.getElementById(settings.wrapperId)
  
    if (!targetElement) return
    
    state.active = true;
    state.wrapper = targetElement
    state.wrapper.style.position = 'fixed'
    state.wrapper.style.width = '100%'
    state.wrapperHeight = state.wrapper.clientHeight
    document.body.style.height = state.wrapperHeight + 'px'
  
    window.addEventListener('resize', handleResize)
  
    settings.cancelOnTouch && window.addEventListener('touchstart', cancel)
  
    state.animateId = window.requestAnimationFrame(() =>
      state.wrapper && animate(
        state.wrapper,
        state.wrapperHeight,
        state.wrapperOffset,
        settings.wrapperDamper,
        animate,
      ),
    )
  } catch (_error) {
    cancel()
  }
}

const resize = (
  wrapper: HTMLElement,
  animateFunction: AnimateFunctionType,
): ScrollState => {
  state.resizing = true

  state.animateId && window.cancelAnimationFrame(state.animateId)

  const newWrapperHeight = wrapper.clientHeight

  if (
    parseInt(document.body.style.height) !== parseInt(`${newWrapperHeight}`)
  ) {
    document.body.style.height = newWrapperHeight + 'px'
  }

  return {
    ...state,
    resizing: false,
    wrapperHeight: newWrapperHeight,
    animateId: window.requestAnimationFrame(
      animateFunction as unknown as FrameRequestCallback,
    ),
  }
}

const animate = (
  wrapper: HTMLElement,
  wrapperHeight: number,
  wrapperOffset: number,
  wrapperDamper: number,
  animateFunction: AnimateFunctionType,
): ScrollState => {
  if (!state.wrapper) return { ...state }

  shouldResize(state.wrapper, wrapperHeight) && resize(state.wrapper, animate)

  const newWrapperOffset = updateWrapperOffset(wrapperOffset, wrapperDamper)

  state.wrapper.style.transform =
    'translate3d(0,' + -newWrapperOffset.toFixed(2) + 'px, 0)'

  return {
    ...state,
    wrapperOffset: newWrapperOffset,
    animateId: window.requestAnimationFrame(() =>
      state.wrapper && animate(
        state.wrapper,
        wrapperHeight,
        newWrapperOffset,
        wrapperDamper,
        animate,
      ),
    ),
  }
}

const cancel = (): void => {
  if (state.active && state.animateId) {
    window.cancelAnimationFrame(state.animateId)
    window.removeEventListener('resize', handleResize)
    state.wrapper?.removeAttribute('style')
    document.body.removeAttribute('style')

    state = {
      ...state,
      active: false,
      wrapper: null,
      animateId: null,
    }
  }
}

const handleResize = () => {
  if (state.wrapper && shouldResize(state.wrapper, state.wrapperHeight)) {
    state = resize(state.wrapper, animate)
  }
}

const validateOptions = (
  options: Partial<ScrollSettings>,
  defaults: ScrollSettings,
): ScrollSettings => ({
  ...defaults,
  ...options,
})

const updateWrapperOffset = (
  wrapperOffset: number,
  wrapperDamper: number,
): number => {
  const scrollY = document.scrollingElement
    ? document.scrollingElement.scrollTop
    : document.documentElement.scrollTop || 0.0

  return wrapperOffset + (scrollY - wrapperOffset) * wrapperDamper
}

const shouldResize = (
  wrapper: HTMLElement,
  wrapperHeight: number,
): boolean => !state.resizing && wrapper.clientHeight !== wrapperHeight

const scrollButter = { init, cancel }

export default scrollButter
