
cd go && \
    GOARCH=wasm GOOS=js go build -o ../extension/main.wasm main.go
