// Listen for the message from background.js to initialize WASM
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "initWasm") {
    initWasm(); // Load wasm_exec.js and then initialize WASM
  }
  return true;
});

async function initWasm() {
  let timeout = 50;
  if (!window.blockShorts) {
    try {
      const go = new Go();

      const response = await fetch(chrome.runtime.getURL("main.wasm")),
        buffer = await response.arrayBuffer(),
        module = await WebAssembly.compile(buffer),
        instance = await WebAssembly.instantiate(module, go.importObject);

      go.run(instance);

      timeout = 1000;
    } catch (err) {
      console.error(err);
    }
  }

  try {
    setTimeout(window.blockShorts, timeout);
  } catch {
    console.error(err);
  }
}
