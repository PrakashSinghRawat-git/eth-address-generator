#!/usr/bin/env node

const fs = require("fs");
const ethers = require("ethers");
const crypto = require("crypto");

// Function to generate an address with the given starting and ending substrings
function generateAddress(start, end) {
    let id = "";
    let privateKey = "";
    let wallet = {};
    let address = "";
    let i = 1;
    let output = "";

    console.log("Generating new address. Wait till then...");

    // Record start time
    const startTime = Date.now();

    // Initialize the process
    process.stdout.write(`Generating new address 1...`);

    while (
        (start !== "*" && !address.startsWith(`0x${start}`)) ||
        (end !== "*" && !address.endsWith(end))
    ) {
        // Clear the previous output
        process.stdout.clearLine();
        process.stdout.cursorTo(0);

        id = crypto.randomBytes(32).toString("hex");
        privateKey = "0x" + id;
        wallet = new ethers.Wallet(privateKey);
        address = wallet.address;

        // Update the output with the current attempt
        output = `Generating new address ${i++}...`;
        process.stdout.write(output);
    }

    // Record end time
    const endTime = Date.now();

    // Calculate elapsed time
    const elapsedTime = endTime - startTime;

    console.log("\nFOUND");
    console.log("FOUND: Private Key:", privateKey);
    console.log("FOUND: Public Address:", wallet.address);
    console.log("Check the .txt file for the for public and private address");
    console.log("Time taken:", (elapsedTime / 1000).toFixed(2), "seconds");

    // Save the results to a file
    const fileContent = `FOUND: Private Key: ${privateKey}\nFOUND: Public Address: ${
        wallet.address
    }\nTime taken: ${(elapsedTime / 1000).toFixed(2)} seconds`;
    fs.writeFileSync("result.txt", fileContent);
}

// Prompt the user to enter the starting and ending substrings
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});
// print message to terminal
console.log("Welcome to the Ethereum Address Generator");
console.log(
    "NOTE: only enter strings including digits and CHARACTER FROM 'a' to 'f'"
);
readline.question("Enter the starting substring (or * for any): ", (start) => {
    readline.question("Enter the ending substring (or * for any): ", (end) => {
        readline.close();
        generateAddress(start === "*" ? "*" : start, end === "*" ? "*" : end);
    });
});
