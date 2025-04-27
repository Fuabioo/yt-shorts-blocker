# YouTube Shorts Blocker

A chrome extension to block YouTube shorts build using Go WASM.

## Installation

- [Chrome Web Store](https://chromewebstore.google.com/detail/noldhkkakmjnkfjglcnblbfchgnbijla?utm_source=item-share-cp)
- Source: just go to Chrome extensions and load the unpacked extension from the `extension` folder (should already be built from source)

## Build from source

### Dependencies

1. Fetch go modules
  ```sh
  go mod tidy
  ```
2. Copy the go js wasm file to the `extension` folder
  ```sh
  cp $(go env GOROOT)/misc/wasm/wasm_exec.js extension/
  ```

### Compile WASM module

```sh
./run.sh
```

### Zip the extension

Just compress all the contents inside the `extension` folder AFTER compiling the WASM module.

```sh
zip -r yt-shorts-blocker.zip extension
```
