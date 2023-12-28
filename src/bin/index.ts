#!/usr/bin/env node

import { defineCommand, runMain } from "citty";

import { runInit, handleInitArgs, InitArgs } from "../init";
import { runServe, handleServeArgs } from "../serve";

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
});

const serveCommand = defineCommand({
    args: {},
    run({ args }){
        runServe(handleServeArgs());
    }
})

const main = defineCommand({
    meta: {
        name: "FighterJet"
    },
    subCommands: {
        init: initCommand,
        serve: serveCommand
    }
});

runMain(main);