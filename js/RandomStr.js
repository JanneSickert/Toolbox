function startGenerateRandomString(parameterDocument) {
  function CreateRandomString() {

    var LETTERS = "ABCDEFGHIJKLNMOPQRSTUVWXYZ"
    var SONDERZEICHEN = "@€Ä#!'§$%&/()=?"
    var LETTERS_LEN = LETTERS.length
    var SONDERZEICHEN_LEN = SONDERZEICHEN.length
    this.s = []
    this.words = []
    this.selection = {
        grossbuchstaben: true,
        kleinbuchstaben: true,
        zahlen: true,
        sonderzeichen: true,
        anzahlZeichen: 35
    }
    theDocument = null

    this.initCharset = () => {
      if (this.selection.grossbuchstaben) {
        for (var i = 0; i < LETTERS_LEN; i++) {
          this.s.push(LETTERS[i])
        }
      }
      if (this.selection.kleinbuchstaben) {
        for (var i = 0; i < LETTERS_LEN; i++) {
          this.s.push(LETTERS[i].toLowerCase())
        }
      }
      if (this.selection.zahlen) {
        for (var i = 0; i < 10; i++) {
          this.s.push("" + i)
        }
      }
      if (this.selection.sonderzeichen) {
        for (var i = 0; i < SONDERZEICHEN_LEN; i++) {
          this.s.push(SONDERZEICHEN[i])
        }
      }
    }

    this.calculateRandomString = () => {
        var res = ""
        for (var i = 0; i < this.selection.anzahlZeichen; i++) {
          var randomNr = parseInt(this.s.length * Math.random())
          res += this.s[randomNr]
        }
        return res
    }

    this.generateRandomStrings = (nr) => {
      var words = new Array()
      for (var i = 0; i < nr; i++) {
        try {
          words.push(this.calculateRandomString())
        } catch {
          alert("ein fehler in generateRandomStrings")
        }
      }
      return words
    }
  }

  /**
   * @Constructor
   */
  var executeRandomString = (theDocument) => {
    var random_string_generator
    random_string_generator = new CreateRandomString()
    random_string_generator.initCharset()
    var arr = random_string_generator.generateRandomStrings(100)
    theDocument.write("<h1>CreateRandomString</h1>")
    theDocument.write("<br><br>")
    JSON.stringify(random_string_generator.selection)
    theDocument.write("<br><br>")
    arr.forEach((e) => {
      theDocument.write(e)
      theDocument.write("<br>")
      console.log("printed " + e)
    })
  }

  executeRandomString(parameterDocument)
}