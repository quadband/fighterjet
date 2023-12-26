import * as path from "path";
import * as fs from "fs";

import { consola } from "consola";

export interface InitArgs {
    dir: string;
    force: boolean;
}

export function runInit(args: InitArgs){
    console.log(args);

    consola.start("Initializing FighterJet...");
    if(args.force) consola.info("Using --force flag");

    const targetBaseDir = (path.resolve(process.cwd(), args.dir));
    const fjDir = path.resolve(targetBaseDir, "./fighterjet");
    const fjConfig = path.resolve(targetBaseDir, "./fighterjet.config.ts");

    // Check if directories and stuff exist
    let ok: boolean = true;
    if(fs.existsSync(fjDir)){
        if(!args.force) consola.error(`FighterJet directory already exists: "${fjDir}"`);
        ok = false;
    }
    if(fs.existsSync(fjConfig)){
        if(!args.force) consola.error(`FighterJet Config already exists: "${fjConfig}"`);
        ok = false;
    }
    if(!ok && !args.force){
        consola.fail("Unable to initialize FighterJet. Use --force to overwrite.");
        process.exit(0);
    }

    if(!ok && fs.existsSync(fjDir)){
        consola.info(`Removing directory: "${fjDir}"`);
        fs.rmdirSync(fjDir);
    }
    consola.info(`Creating directory: "${fjDir}"`);
    fs.mkdirSync(fjDir);

    if(!ok && fs.existsSync(fjConfig)) consola.info(`Overwriting config: "${fjConfig}"`);
    else console.log(`Creating config: "${fjConfig}"`);
    fs.writeFileSync(fjConfig, DEFAULT_CONFIG, "utf-8");

    consola.success("FighterJet initialized!");
}

export function handleInitArgs(args: Partial<InitArgs>): InitArgs {
    const initArgs: InitArgs = {
        dir: args.dir || ".",
        force: args.force || false
    };

    return initArgs;
}

const DEFAULT_CONFIG = `// Default config

`;