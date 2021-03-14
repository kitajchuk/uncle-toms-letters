uncle-toms-letters
==================

> A World War II Era Family History Project


**Posts:**

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


**Builds:**

[![Netlify Status](https://api.netlify.com/api/v1/badges/2186c3c6-d0ec-4537-ab4d-c1c5b6e571b1/deploy-status)](https://app.netlify.com/sites/uncle-toms-letters/deploys)


**Stack:**

* Next.js & Vercel
* Preact [based on @developit example](https://github.com/developit/nextjs-preact-demo)
* Tailwind CSS


**Deploys:**

* [Vercel](https://uncle-toms-letters.vercel.app/)
  * Badge: https://github.com/datejer/vercel-badge
* [Netlify](https://uncle-toms-letters.netlify.app/)
  * Build command: `next build && next export`
  * Publish directory: `out`