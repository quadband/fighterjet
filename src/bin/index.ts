#!/usr/bin/env node

import { defineCommand, runMain } from "citty";

import { runInit, handleInitArgs, InitArgs } from "../init";

const initCommand = defineCommand({
    args: {
        dir: {
            type: "positional",
            required: false
        },
        force: {
            type: "boolean"
        }
    },
    run({ args }){
        runInit(handleInitArgs(args as Partial<InitArgs>));
    }
})

const main = defineCommand({
    meta: {
        name: "FighterJet"
    },
    subCommands: {
        init: initCommand
    }
});

runMain(main);