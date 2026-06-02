import Lexer from "./Lexer.js";
import Parser from "./Parser.js"
import readline from "readline"


async function getStdin() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    return new Promise((resolve) => {
        rl.question('> ', (input) => {
            rl.close()
            resolve(input)
        })
    })
}

function printAst(node, prefix = "", isLeft = true) {
    if (!node) return "";

    let result = "";

    const label = node.type
        ? `${node.type}: ${node.value}`
        : `${node.operator.type}: ${node.operator.value}`;

    if (node.right) {
        result += printAst(node.right, prefix + (isLeft ? "│   " : "    "), false);
    }

    result += prefix + (isLeft ? "└── " : "┌── ") + label + "\n";

    if (node.left) {
        result += printAst(node.left, prefix + (isLeft ? "    " : "│   "), true);
    }

    return result;
}

async function main() {

    let showTokens = false

    while (true) {

        const input = await getStdin()

        if (input === "#quit") {
            console.log("exiting")
            break
        }

        if (input === "#clear") {
            console.clear()
            process.stdout.write(" >")
            continue
        }

        if (input === "#tokens") {
            showTokens = !showTokens
            console.log(showTokens ? "Showing tokens" : "Hiding tokens")
            continue
        }
        
        const lexer = new Lexer(input)
        let tokens = lexer.tokenize()

        const parser = new Parser(tokens)
        const ast = parser.parse()
        
        console.log(printAst(ast))

        if (showTokens) {
            console.log(tokens)
        }
    }

}

main()