var ad = null
var raw = ""

const MATH_CHARS = {
    key: ["and", "or", "is", "not", "follow", "Exists", "all", "thidisnot", "equ", "etwa"],
    val: ["∧", "∨", "≡", "¬", "⇒", "∃", "∀", "≠", "≙", "≈"]
}

const MATH_CHARS_LENGTH = MATH_CHARS.key.length

var checkForKey = (text) => {
    for (var i = 0; i < MATH_CHARS_LENGTH; i++) {
        if (raw.indexOf(MATH_CHARS.key[i]) >= 0) {
            raw = ""
            var erg = MATH_CHARS.val[i]
            return [erg, true, i]
        }
    }
    return [text, false, -1]
}

var write = (txt) => {
    var next = ad.getElementById("con").innerHTML + txt
	ad.getElementById("con").innerHTML = next
}

var br = () => {
    var next = ad.getElementById("con").innerHTML + "<br>"
	ad.getElementById("con").innerHTML = next
}

var rewrite = (txt) => {
    var textLeng = ad.getElementById("con").innerHTML.length
    var lenToSub = MATH_CHARS.key[txt[2]].length - 1
    var rest = ad.getElementById("con").innerHTML.substr(0, textLeng - lenToSub)
    var nextText = rest + txt[0]
    ad.getElementById("con").innerHTML = nextText
}

/**
 *
 * @param {Das eingegebende Zeichen} text
 */
var print = (text) => {
    if (text.length > 1) {
        return
    }
    raw += text
    textObj = checkForKey(text)
    if (textObj[1]) {
        rewrite(textObj)// text[0] ist ein Sonderzeichen
    } else {
        write(textObj[0])
    }
}

var setKey = function(pDocument) {
    pDocument.onkeydown = function(event) {
        for (var i = 0; i < keyCodes.keyCode.length; i++) {
            if (event.keyCode == 13) {
                br()
                break
            }
            if (event.keyCode == keyCodes.keyCode[i]) {
                print(keyCodes.char[i])
                setKey(pDocument)
            }
        }
    }
}

var startMathPrint = (pDocument) => {
    if (!(MATH_CHARS.key.length == MATH_CHARS.val.length)) {
        alert("MATH_CHARS.key.length == MATH_CHARS.val.length")
    }
    ad = pDocument
    setKey(pDocument)
}
