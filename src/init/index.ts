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
    const fjTSConfig = path.resolve(targetBaseDir, "./tsconfig.fighterjet.json");

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
    if(fs.existsSync(fjTSConfig)){
        if(!args.force) consola.error(`FighterJet TSConfig aleady exists: "${fjTSConfig}"`);
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
    else consola.info(`Creating config: "${fjConfig}"`);
    fs.writeFileSync(fjConfig, DEFAULT_CONFIG, "utf-8");

    if(!ok && fs.existsSync(fjTSConfig)) consola.info(`Overwriting TSConfig: "${fjTSConfig}"`);
    else consola.info(`Creating FighterJet TSConfig: "${fjTSConfig}"`);
    fs.writeFileSync(fjTSConfig, JSON.stringify(DEFAULT_TSCONFIG, null, 2), "utf-8");

    const baseTSConfigPath = path.resolve(targetBaseDir, "./tsconfig.json");
    consola.info(`Appending base TSConfig: "${baseTSConfigPath}"`);

    let baseTSConfig;
    if(fs.existsSync(baseTSConfigPath)){
        const tsConfigStr = fs.readFileSync(baseTSConfigPath, "utf-8");
        const tsConfigObj = JSON.parse(tsConfigStr);

        if(!tsConfigObj.references) tsConfigObj.references = [];

        let hasRef: boolean = false;        
        tsConfigObj.references.forEach((ref)=>{
            if(ref.path == "./tsconfig.fighterjet.json") hasRef = true;
        });
        if(hasRef) baseTSConfig = tsConfigStr;
        else {
            tsConfigObj.references.push({ "path": "./tsconfig.fighterjet.json" });
            baseTSConfig = JSON.stringify(tsConfigObj, null, 2);
        }
    } else {
        baseTSConfig = JSON.stringify({ "references": [{ "path": "./tsconfig.fighterjet.json" }]}, null, 2);
    }
    fs.writeFileSync(baseTSConfigPath, baseTSConfig, "utf-8");

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

const DEFAULT_TSCONFIG = {
    "compilerOptions": {
        "composite": true,
        "skipLibCheck": true,
        "module": "ESNext",
        "lib": ["ESNext", "dom"],
        "moduleResolution": "bundler",
        "allowSyntheticDefaultImports": true,
        "allowImportingTsExtensions": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "jsx": "preserve",
        "jsxImportSource": "solid-js",
    },
    "include": ["fighterjet"]
};