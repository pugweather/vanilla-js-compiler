class Lexer {
    constructor(input) {
        this.input = input
        this.tokenizers = [
            {type: "number", regex: /^\d+/},
            {type: 'plusToken', regex: /^\+/ },
            {type: 'minusToken', regex: /^-/ },
            {type: 'multiplyToken', regex: /^\*/ },
            {type: 'divideToken', regex: /^\// },
            {type: 'whitespace', regex: /^\s+/}
        ]
        this.tokens = []
    }

    tokenize() {

        let currentIndex = 0

        while (currentIndex < this.input.length) {

            let matchedToken = null

            for (let tokenizer of this.tokenizers) {

                const regex = this.input.slice(currentIndex).match(tokenizer.regex)

                if (regex) {
                    this.tokens.push({type: tokenizer.type, value: regex[0]})
                    matchedToken = tokenizer.type
                    currentIndex = currentIndex + regex[0].length
                }

            }

            if (!matchedToken) {
                console.log("Error: Unrecognizable token " + this.input.slice(currentIndex))
                return
            }

        }

        for (let i = 0; i < this.tokens.length; i++) {
            if (this.tokens[i].type === "whitespace") {
                this.tokens.splice(i, 1)
            }
        }

        this.tokens.push({type: "endOfFile", value: null})

        return this.tokens

    }
}

export default Lexer