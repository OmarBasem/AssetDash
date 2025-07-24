# AssetDash

This project is a small react native application to display a list of crypto assets with simulated updates and filtering mechanisms

<div align="center">
  <video src="https://github.com/user-attachments/assets/cf2cffd9-18ac-4db0-a3d9-e2b90af2c272" />
</div>

## Project Setup

1. Git clone: `git clone git@github.com:OmarBasem/AssetDash.git && cd AssetDash`
2. Install packages: `npm install`
3. Start ios app: `npx expo run:ios`

## Features

1. Fetching and displaying list of crypto assets
2. Simulated price updates every 10 seconds to some of the items
3. Filtering: is_new, is_pro, and price greater than
4. Sorting: by price or market cap
5. An AssetDetail screen to display more info about an asset

## Tech Stack

- Framework: React Native and Expo
- Programming Language: TypeScript
- API fetch: React Query
- State management: Zustand and MMKV

## Technical Decisions

I think the part which required some thinking is how to display the assets Icons. Using a simple Image component did not
work as not all assets returned a well formatted image with the right MIME type. The icons uri could return any of the following:

- Proper image with the right mime type and extension
- Image but mime type and extension missing
- SVG
- SSL error
- Non 2xx response

Therefore, I created a customized AssetIcon component to handle the different cases, and a fetchIcon util function under `utils/images.ts`.
I used react-native-blob-util to download the image. BlobUtil will detect and assign the right mime type. If it was an svg,
then an SVG component will be used to render the icon. In case of an SSL error or a non 2xx response, a default placeholder will be displayed.

I simulated price updates inside `useAssets` hook using a `setInterval` to update some of the assets at random every 10 seconds.

I used FlashList, an efficient, performant, and low-memory virtualized list, to display the list of assets.

I used ReactQuery to fetch, cache, and sync server data in the UI with minimal boilerplate and built-in performance optimizations.

I used Zustand for a fast, minimal, and scalable state management with a simple API and no boilerplate.

I used MMKV for fast, persistent, and synchronous storage with minimal overhead.

## Next Steps

Some of the steps I would take If I were to take that demo app to production:

- Fix icon url issues from the backend by having all of them return a properly formatted PNG image
- Add pagination for assets fetching for faster loading
- Use a real refetch to show price changes, like refetchInterval in react query, instead of simulating
- add unit tests, component tests, and e2e tests
