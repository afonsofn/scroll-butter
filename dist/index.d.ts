import { ScrollSettings } from './types';
export * from './types';
declare const scrollButter: {
    init: (options?: Partial<ScrollSettings>) => void;
    cancel: () => void;
};
export default scrollButter;
