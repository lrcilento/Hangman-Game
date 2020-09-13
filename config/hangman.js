document.addEventListener('keydown', (key) => checkKey(key));

var running = false
var words = ['ORANGE', 'APPLE', 'PEAR', 'PEACH', 'GRAPE']
var guesses = []
var word = []
var guessed = []
var errors = 0

function generate() {
    running = true
    guesses = []
    guessed = []
    errors = 0
    word = words[Math.floor(Math.random() * words.length)].split('')
    for (var i = 0; i < word.length; i++) {
        guesses.push("false")
    }
    renderBody()
    renderWord()
    renderResult(-2, '-2')
}

function renderBody() {
    var structure
    if (errors == 0) {
        structure = React.createElement("div", null,
                        React.createElement("div", null,
                            React.createElement("img", {src:'img/head.png'}, null)
                        ),
                        React.createElement("div", null,
                            React.createElement("img", {src:'img/body.png'}, null)
                        ),
                        React.createElement("div", null,
                            React.createElement("img", {src:'img/legs.png'}, null)
                        )
                    )
    }
    else if (errors == 1) {
        structure = React.createElement("div", null,
                        React.createElement("div", null,
                            React.createElement("img", {src:'img/head.png'}, null)
                        ),
                        React.createElement("div", null,
                            React.createElement("img", {src:'img/body.png'}, null)
                        )
                    )

    }
    else if (errors == 2) {
        structure = React.createElement("div", null,
                        React.createElement("div", null,
                            React.createElement("img", {src:'img/head.png'}, null)
                        )
                    )
    }
    else {
        structure = React.createElement("div", null, null)
    }

    ReactDOM.render(structure, document.getElementById('hangman'))
}

function renderWord() {
    var output = "";
    for (var i = 0; i < word.length; i++) {
        if(guesses[i] == "true") {
            output += word[i] + " "
        }
        else {
            output += "_ "
        }
    }
    structure = React.createElement("h3", null, output)
    ReactDOM.render(structure, document.getElementById('words'))
}

function renderResult(type, key) {
    if (type == 1) {
        result = "("+key+") Correct!"
    }
    else if (type == 0) {
        result = "("+key+") Wrong!"
    }
    else if (type == -1) {
        result = "("+key+") Already guessed!"
    }
    else {
        result = "Press any key to start guessing!"
    }
    structure = React.createElement("h4", null, result)
    ReactDOM.render(structure, document.getElementById('results'))
}

function checkKey(key) {
    var keyPressed = String.fromCharCode(key.which)
    if (running) {
        if (!guessed.includes(keyPressed)) {
            if (word.includes(keyPressed)) {
                renderResult(1, keyPressed)
                right(keyPressed)
            }
            else {
                renderResult(0, keyPressed)
                wrong(keyPressed)
            }
        }
        else {
            renderResult(-1, keyPressed)
        }
    }
}

function wrong() {
    errors++
    renderBody()
    if (errors >= 3) {
        alert('Game Over!')
        generate()
    }
}

function right(key) {
    for (var i = 0; i < word.length; i++) {
        if (word[i] == key) {
            guesses[i] = "true"
        }
    }
    guessed.push(key)
    renderWord()
    if (!guesses.includes("false")) {
        alert('Congratulations! \n Finished with '+errors+' errors!')
        generate()
    }
}