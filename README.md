# ScrollButter

ScrollButter is a lightweight and efficient library designed to provide a smooth scrolling effect for web applications. Crafted to be framework-agnostic, it can be seamlessly integrated into React, Vue, and other frontend projects. With its straightforward and intuitive API, ScrollButter enhances the user's scrolling experience, making it more fluid and pleasant without compromising performance.

## Installation

To install ScrollButter, use npm:

```bash
npm install scroll-butter
```

Or with yarn:

```bash
yarn add scroll-butter
```

## Usage

### React

```javascript
import { useEffect } from 'react'
import scrollButter, { ScrollButterOptions } from 'scroll-butter'

export const useScrollButter = (options?: ScrollButterOptions) => {
  useEffect(() => {
    scrollButter.init(options)

    return () => {
      scrollButter.cancel()
    }
  }, [])
}

// In your component
import { useScrollButter } from 'my-hooks';

useScrollButter({
  wrapperId: 'your-wrapper-id',
  wrapperDamper: 0.05,
});
```

### Vanilla JS

```javascript
import scrollButter from 'scroll-butter'

// Initialize
scrollButter.init(
  wrapperId: 'your-wrapper-id',
  wrapperDamper: 0.05,
);

// To cancel
scrollButter.cancel();
```

## Configuration

You can pass configuration options to the `init` function:

```javascript
butter.init({
  wrapperId: 'your-wrapper-id',
  wrapperDamper: 0.05,
  cancelOnTouch: true
});
```

## Options

- `wrapperId`: The ID of the element you want to apply the smooth scroll to. Default is 'butter'.
- `wrapperDamper`: Controls the smoothness of the scroll. Lower values make it more smooth. Default is 0.03.
- `cancelOnTouch`: If set to true, the smooth scroll effect will be canceled on touch devices. Default is false.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

ISC