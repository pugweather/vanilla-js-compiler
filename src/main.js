import Lexer from "./Lexer.js";
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

async function main() {

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

        const lexer = new Lexer(input)
        lexer.tokenize()
    }

}

main()