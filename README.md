![](http://i.imgur.com/dYBsT13r.png)

# react-phazy

A progressive, lazy-loading image-loader for React, with the canvas Blur effect popularized by [Medium](MediumExample)

![](http://i.imgur.com/Khnp13s.gif)

It's a bunch of totally competent libraries plainly stitched together because I've [read][1] a [handful][2] of [articles][3] on how to build what Medium built, but no one had the common decency to publish an `npm` package.

This project's examples were bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Installation

`npm install react-phazy --save`

[MediumExample]:https://medium.com/the-nib/my-life-with-a-pre-existing-condition-e569d71da36c
[1]:https://jmperezperez.com/medium-image-progressive-loading-placeholder/
[2]:https://css-tricks.com/the-blur-up-technique-for-loading-background-images/
[3]:https://codepen.io/anthonykoch/pen/WrOQQz

## Usage

Provide a high resolution `source` image, its width and height, and a very small `preview` image and you're off to the races. The `alt` text is also required because we're not monsters.

```jsx
<Phazy
  source={source}
  preview={preview}
  alt={alt}
  width={width}
  height={height}
/>
```

Required styles are available in `App.css` under `.phazy`

## Demo

```bash
yarn
yarn start
```