import { ScrollSettings } from './types';
declare const scrollButter: {
    init: (options?: Partial<ScrollSettings>) => void;
    cancel: () => void;
};
export default scrollButter;
