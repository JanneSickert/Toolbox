function init(pDocument, plocalStorage) {
    myLinks = new MyLinks(pDocument, localStorage)
}

function select(pDocument, plocalStorage) {
    const NAME_LIST = ["Path Converter", "Random String", "Math Print", "Links"]
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
        case 3:
            startLink(pDocument, plocalStorage)
            break
        default:
            alert("Ungültige Eingabe: " + input)
            select(pDocument, plocalStorage)
    }
}

function main(pDocument, plocalStorage) {
    init(pDocument, plocalStorage)
    select(pDocument, plocalStorage)
}
