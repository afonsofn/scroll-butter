"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var defaultSettings = {
    wrapperId: 'butter',
    wrapperDamper: 0.03,
    cancelOnTouch: false,
};
var state = {
    wrapper: null,
    wrapperOffset: 0,
    animateId: null,
    resizing: false,
    active: false,
    wrapperHeight: 0,
    bodyHeight: 0,
};
var init = function (options) {
    try {
        var settings_1 = validateOptions(options || {}, defaultSettings);
        var targetElement = document.getElementById(settings_1.wrapperId);
        if (!targetElement)
            return;
        state.active = true;
        state.wrapper = targetElement;
        state.wrapper.style.position = 'fixed';
        state.wrapper.style.width = '100%';
        state.wrapperHeight = state.wrapper.clientHeight;
        document.body.style.height = state.wrapperHeight + 'px';
        window.addEventListener('resize', handleResize);
        settings_1.cancelOnTouch && window.addEventListener('touchstart', cancel);
        state.animateId = window.requestAnimationFrame(function () {
            return state.wrapper && animate(state.wrapper, state.wrapperHeight, state.wrapperOffset, settings_1.wrapperDamper, animate);
        });
    }
    catch (_error) {
        cancel();
    }
};
var resize = function (wrapper, animateFunction) {
    state.resizing = true;
    state.animateId && window.cancelAnimationFrame(state.animateId);
    var newWrapperHeight = wrapper.clientHeight;
    if (parseInt(document.body.style.height) !== parseInt("".concat(newWrapperHeight))) {
        document.body.style.height = newWrapperHeight + 'px';
    }
    return __assign(__assign({}, state), { resizing: false, wrapperHeight: newWrapperHeight, animateId: window.requestAnimationFrame(animateFunction) });
};
var animate = function (wrapper, wrapperHeight, wrapperOffset, wrapperDamper, animateFunction) {
    if (!state.wrapper)
        return __assign({}, state);
    shouldResize(state.wrapper, wrapperHeight) && resize(state.wrapper, animate);
    var newWrapperOffset = updateWrapperOffset(wrapperOffset, wrapperDamper);
    state.wrapper.style.transform =
        'translate3d(0,' + -newWrapperOffset.toFixed(2) + 'px, 0)';
    return __assign(__assign({}, state), { wrapperOffset: newWrapperOffset, animateId: window.requestAnimationFrame(function () {
            return state.wrapper && animate(state.wrapper, wrapperHeight, newWrapperOffset, wrapperDamper, animate);
        }) });
};
var cancel = function () {
    var _a;
    if (state.active && state.animateId) {
        window.cancelAnimationFrame(state.animateId);
        window.removeEventListener('resize', handleResize);
        (_a = state.wrapper) === null || _a === void 0 ? void 0 : _a.removeAttribute('style');
        document.body.removeAttribute('style');
        state = __assign(__assign({}, state), { active: false, wrapper: null, animateId: null });
    }
};
var handleResize = function () {
    if (state.wrapper && shouldResize(state.wrapper, state.wrapperHeight)) {
        state = resize(state.wrapper, animate);
    }
};
var validateOptions = function (options, defaults) { return (__assign(__assign({}, defaults), options)); };
var updateWrapperOffset = function (wrapperOffset, wrapperDamper) {
    var scrollY = document.scrollingElement
        ? document.scrollingElement.scrollTop
        : document.documentElement.scrollTop || 0.0;
    return wrapperOffset + (scrollY - wrapperOffset) * wrapperDamper;
};
var shouldResize = function (wrapper, wrapperHeight) { return !state.resizing && wrapper.clientHeight !== wrapperHeight; };
var scrollButter = { init: init, cancel: cancel };
exports.default = scrollButter;
