function main(pDocument) {
    const NAME_LIST = ["Path Converter", "Random String", "Math Print"]
    var quest = "Select a number \n\n"
    for (var i = 0; i < NAME_LIST.length; i++) {
        if (i == NAME_LIST.length - 1) {
            quest += "" + i + ": " + NAME_LIST[i]
        } else {
            quest += "" + i + ": " + NAME_LIST[i] + "\n"
        }
    }
    var input = parseInt(prompt(quest))
    switch (input) {
        case 0: 
            fooPathConverter(pDocument) 
            break
        case 1:
            startGenerateRandomString(pDocument)
            break
        case 2:
            startMathPrint(pDocument)
            break
    }
}
