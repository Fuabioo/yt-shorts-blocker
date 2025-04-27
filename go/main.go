package main

import (
	"strings"
	"syscall/js"

	"github.com/charmbracelet/log"
)

func blockShorts(this js.Value, p []js.Value) interface{} {
	log.Debug("Executing block script")

	location := js.Global().Get("location")
	document := js.Global().Get("document")

	url := location.Get("pathname").String()

	log.Debug(url, "block", containsShorts(url))
	if containsShorts(url) {
		location.Call("replace", "/")
		return nil
	}

	videoElements := document.Call("querySelectorAll", "ytm-shorts-lockup-view-model")

	length := videoElements.Length()

	log.Debugf("Found %d videos", length)

	for i := 0; i < length; i++ {
		video := videoElements.Index(i)
		go func() {
			log.Debug("Disabling video", "index", i)
			video.Set("hidden", "true")
		}()
	}

	return nil
}

func containsShorts(url string) bool {
	// Look for the "shorts" pattern in the URL
	res := strings.Contains(url, "shorts")
	log.Debug("Does the url contains shorts?",
		"url", url,
		"res", res,
	)
	return res
}

const debug = false

func main() {
	if debug {
		log.SetLevel(log.DebugLevel)
	}

	log.Debug("Loaded blocking script")

	c := make(chan struct{}, 0)

	js.Global().Set("blockShorts", js.FuncOf(blockShorts))

	<-c
}
