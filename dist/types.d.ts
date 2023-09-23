export interface ScrollSettings {
    wrapperId: string;
    wrapperDamper: number;
    cancelOnTouch: boolean;
}
export interface ScrollState {
    wrapper: HTMLElement | null;
    wrapperOffset: number;
    animateId: number | null;
    resizing: boolean;
    active: boolean;
    wrapperHeight: number;
    bodyHeight: number;
}
export type AnimateFunctionType = (wrapper: HTMLElement, wrapperHeight: number, wrapperOffset: number, wrapperDamper: number, animateFunction: AnimateFunctionType) => ScrollState;
