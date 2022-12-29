function MyLinks(pDocument, localStorage) {

    this.pDocument = pDocument
    this.localStorage = localStorage
    const KEY = "MyLinks"
    this.links = null

    var startLinking = () => {
        var id = parseInt(prompt("id:?,    -1: abruch"))
        if (id == -1) {
            return
        }
        var url = this.links[id]
        window.location.href = url
    }

    var storeData = () => {
        try {
            this.localStorage.setItem(KEY, JSON.stringify(this.links))
        } catch {
            console.log("error in storeData function")
        }
    }

    this.restoreData = () => {
        try {
            var raw_links = this.localStorage.getItem(KEY)
            this.links = JSON.parse(raw_links)
            if (this.links == null) {
                this.links = new Array()
            }
        } catch {
            console.log("error in restoreData function")
            this.links = []
        }
    }

    this.printData = (url) => {
        if (url == null) {
            for (var i = 0; i < this.links.length; i++) {
                var content = "" + i + ": " + this.links[i]
                console.log(content)
                this.pDocument.write(content)
                this.pDocument.write("<br>")
            }
        } else {
            console.log(url)
            this.pDocument.write(url)
            this.pDocument.write("<br>")
        }
    }

    this.startLinkProgramm = () => {
        this.restoreData()
        this.printData(null)
        startLinking()
    }

    this.addLink = (link) => {
        this.restoreData()
        this.links.push(link)
        storeData()
    }
}

var myLinks = null

function addLink(url) {
    myLinks.addLink(url)
    console.log("added: " + url)
    myLinks.printData(url)
}

var startLink = (pDocument, localStorage) => {
    pDocument.write("Mit addLink(url) können links hinzugefügt werden.")
    pDocument.write("<br><br>")
    myLinks.startLinkProgramm()
}