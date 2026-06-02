class Parser {
    #tokens
    #position
    constructor(tokens) {
        this.#tokens = tokens
        this.#position = 0
    }

    currentToken() {
        return this.peek(0)
    }
    
    peek(offset) {
        const index = this.#position + offset
        if (index < this.#tokens.length) {
            return this.#tokens[index]
        }
        console.log("Error: position " + index + " out of range")
    }
    
    match(type) {
        const token = this.#tokens[this.#position]
        if (token.type === type) {
            return this.nextToken()
        }
        console.log("Error: invalid token type. Expected " + type + " but got " + token.type)
    }
    
    parseBinaryExpression() {
        return this.match("number")
    }
    
    nextToken() {
        const token = this.#tokens[this.#position]
        this.#position++
        return token
    }

    parse() {

        let leftToken = this.parseBinaryExpression()

        while (this.currentToken().type === "plusToken" || this.currentToken().type === "minusToken") {
            const operatorToken = this.nextToken()
            const rightToken = this.parseBinaryExpression()
            leftToken = {
                left: leftToken,
                operator: operatorToken,
                right: rightToken
            }
        }
        
        return leftToken
    }

}

export default Parser