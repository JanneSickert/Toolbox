function fooPathConverter(parameterDocument) {
	const WELLCOME_MESSAGE = "Here you can insert the path from the windows folder with a "
	+ "right-click and have it processed. When the path is displayed, another path can be "
	+ "added with enter and all paths are formatted in the form that is common in most "
	+ "programming languages. With <help> this message can be displayed again with "
	+ "rel:<root path> all entered paths are processed relative to the root path."
	const STANDART_MESSAGE = "Path:"
	const ENTER_KEY = 13
	var aWriter = null
	var aMyStorage = null
	var arr = []
	var len = 0
	var myCodeArray = null
	var currentText = null
	var startIndex = 0
	var theDocument = null

	function writeInClipboard() {
		function copy2Clipboard(str) {
			ta = theDocument.createElement('textarea');
			ta.value = str;
			theDocument.body.appendChild(ta);
			ta.select();
			theDocument.execCommand('copy');
			theDocument.body.removeChild(ta);
		}
		copy2Clipboard(currentText)
	}

	function myExport(pWriter, pMyStorage) {
		aWriter = pWriter
		aMyStorage = pMyStorage
	}

	function arrayToString(arr) {
		var str = ""
		for (var i = 0; i < arr.length; i++) {
			str = str + arr[i]
		}
		return str
	}

	function store(id, value) {
		aMyStorage.setItem(id, value);
	}

	function restore(id) {
		var ret = aMyStorage.getItem(id);
		return ret
	}

	function resetStorage() {
		aMyStorage.clear()
	}

	function write(str) {
		aWriter.write(str)
	}

	function lineBreak() {
		write("<br><br>")
	}

	function writePath() {
		if (len == 1) {
			write(arr[0])
			currentText = arr[0]
		} else {
			myCodeArray = "{"
			for (var i = 0; i < len; i++) {
				myCodeArray = myCodeArray + "\"" + arr[i] + "\""
				if (i == (len - 1)) {
					myCodeArray = myCodeArray + "};"
				} else {
					myCodeArray = myCodeArray + ", "
				}
			}
			write(myCodeArray)
			currentText = myCodeArray
			lineBreak()
		}
	}

	function processed(val) {
		if (val[0] == 'r' && val[1] == 'e' && val[2] == 'l' && val[3] == ':') {// make rel: paths
			startIndex = val.length - 4
			val = prompt(STANDART_MESSAGE)
		}
		if (val === "help") {
			resetStorage()
			location.reload()
		} else {
			var valAsArray = []
			for (var i = startIndex; i < val.length; i++) {
				if (val[i] == '\\') {
					valAsArray.push("/")
				} else {
					valAsArray.push(val[i])
				}
			}
			arr.push(arrayToString(valAsArray))
			len++
		}
		writePath()
	}

	function deleteFirstAndLast(winPath) {
		var val = winPath
		if (val[0] == 'r' && val[1] == 'e' && val[2] == 'l' && val[3] == ':') {
			var v = deleteFirstAndLast(winPath.substring(4))
			return ("rel:" + v)
		} else {
			var param = [winPath[0] == '\"', winPath[winPath.length - 1] == '\"']
				if (param[0] || param[1]) {
					var la = []
					for (var i = 0; i < winPath.length; i++) {
						if (winPath[i] == '\"') {
							continue
						} else {
							la.push(winPath[i])
						}
					}
					var nnn = arrayToString(la)
					return nnn
			} else {
				return winPath
			}
		}
	}

	function known() {
		processed(deleteFirstAndLast(prompt(STANDART_MESSAGE)))
	}

	function unconsciously() {// new user
		processed(deleteFirstAndLast(prompt(WELLCOME_MESSAGE)))
	}

	function start() {
		var state = restore(0)
		if (state == 1) {
			known()
		} else {
			unconsciously()
			store(0, 1)
		}
	}

	var setKey = function() {
		aWriter.onkeydown = function(event) {
			if (event.keyCode == ENTER_KEY) {
				start()
				writeInClipboard()
				setKey()
			}
		}
	}

	function main(pDocument) {
		theDocument = pDocument
		setKey()
		start()
		writeInClipboard()
	}

	myExport(parameterDocument, localStorage)
	main(parameterDocument)
}