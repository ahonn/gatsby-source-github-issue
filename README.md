# gatsby-source-github-issue

 Gatsby source plugin for Github issue

## Install

`npm install --save gatsby-source-github-issue`

## How to use

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-github-issue`,
    options: {
      owner: 'owner',
      repo: 'repo',
    },
  },
]
```

### Options
- owner: github repo owner
- repo: github repo name

### License
MIT
