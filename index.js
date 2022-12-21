#!/usr/bin/env node
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
let playerName;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow("who wants to be a typescript millionarie? \n");
    await sleep();
    rainbowTitle.stop();
    console.log(`
        ${chalk.bgBlueBright('HOW TO PLAY')}
        I am a process in Your Computer.
        if You give any question wrong I will be ${chalk.bgRedBright('Killed')}
        So Get All the Questions right...
    `);
}
async function askName() {
    const answers = await inquirer.prompt({
        name: 'Player_name',
        type: 'input',
        message: 'What is Your name?',
        default() {
            return 'Player';
        }
    });
    playerName = answers.Player_name;
}
async function question() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'JavaScript Was created in 10 days then released on \n',
        choices: [
            "May 23rd, 1995",
            "Nov 24th, 1995",
            "Dec 4th, 1995",
            "Dec 17, 1995"
        ]
    });
    return handlAnswer(answers.question_1 == "Dec 4th, 1995");
}
async function handlAnswer(isCorrect) {
    const spinner = createSpinner("Checking Answers ....").start();
    await sleep();
    if (isCorrect) {
        spinner.success({ text: `Nice Work ${playerName}. That's a great Answer..` });
    }
    else {
        spinner.error({ text: `${gradient.pastel.multiline("Game Over...... You Lose")}  Mr: ${playerName}!` });
        process.exit(0);
    }
}
function winner() {
    console.clear();
    const msg = `Congrats , ${playerName} ! \n YOU WIN>> \n Rs... 10,000`;
    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
}
await welcome();
await askName();
await question();
await winner();
