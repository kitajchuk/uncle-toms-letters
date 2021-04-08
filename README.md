uncle-toms-letters
==================

> A World War II Era Family History Project

[![CircleCI Status](https://circleci.com/gh/kitajchuk/uncle-toms-letters.svg?style=shield&circle-token=e43bc41f26cb7d5ff448b2b82a61e7b12d1c3b1d)](https://app.circleci.com/pipelines/github/kitajchuk/uncle-toms-letters) [![Netlify Status](https://api.netlify.com/api/v1/badges/2186c3c6-d0ec-4537-ab4d-c1c5b6e571b1/deploy-status)](https://app.netlify.com/sites/uncle-toms-letters/deploys)

# Stack

- [Next.js](https://nextjs.org)
- [Preact: @developit example](https://github.com/developit/nextjs-preact-demo)
- [Tailwind CSS](https://tailwindcss.com)


# Jamstack

- [uncle-toms-letters.vercel.app](https://uncle-toms-letters.vercel.app/)
  - Build command: `yarn download-s3 && next build`
- [uncle-toms-letters.netlify.app](https://uncle-toms-letters.netlify.app/)
  - Build command: `yarn download-s3 && next build && next export`
  - Publish directory: `out`
- Required env vars for the project:
  - `UTL_S3_REPOSITORY`
  - `UTL_AWS_ACCESS_KEY_ID`
  - `UTL_AWS_SECRET_ACCESS_KEY`
  - `UTL_AWS_REGION`

# AWS / CircleCI

- [letters.kitajchuk.com](https://letters.kitajchuk.com)
- [S3 Bucket](http://letters.kitajchuk.com.s3-website-us-west-2.amazonaws.com)
- [S3+CloudFront+SSL](https://letters.kitajchuk.com)
  - Using AWS Certificate Manager
  - Using [CircleCI](https://circleci.com) for CI/CD
    - Required env vars for the project:
      - `UTL_S3_BUCKET`
      - `UTL_S3_REPOSITORY`
      - `UTL_DISTRIBUTION_ID`
      - `UTL_AWS_ACCESS_KEY_ID`
      - `UTL_AWS_SECRET_ACCESS_KEY`
      - `UTL_AWS_REGION`
      - `AWS_ACCESS_KEY_ID`
      - `AWS_SECRET_ACCESS_KEY`
      - `AWS_REGION`
    - Using [aws-s3 orb](https://circleci.com/developer/orbs/orb/circleci/aws-s3)
    - Using [aws-cloudfront orb](https://circleci.com/developer/orbs/orb/topmonks/aws-cloudfront)

Deploy to S3 bucket with AWS CLI from a local machine. Environment variables stored in `.env.production.local` exposed with `env-cmd`.

```shell
# Build the static React app
yarn build && yarn export

# UTL_S3_BUCKET={bucket}
# UTL_DISTRIBUTION_ID={id}
yarn deploy
```

# Posts

The basic `yaml` structure for a post looks like this:

```yaml
---
attachments:
  - attachment1?.jpg
  - attachment2?.jpg
  ...
pages:
  - title: Page 1
    document: document?.jpg
    english:
      - line 1
      - line 2
      ...
    german:
      - line 1
      - line 2
      ...
  ...
---
```

To group lines of text together with tighter leading for a page translation block:

```yaml
pages:
  - title: Page 1
    document: document?.jpg
    english:
      - 
        - grouped_line 1
        - grouped_line 2
        - grouped_line 3
        ...
      - line 1
      - line 2
      ...
```

To create a single text translation with multiple inline documents:

```yaml
pages:
  - title: Typed Letter
    documents:
      - document1?.jpg
      - document2?.jpg
      ...
    english:
      - lines_of_text
      ...
```