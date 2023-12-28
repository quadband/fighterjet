import * as path from "path";

import { BuildRootOptions, buildRoot } from "../build";

export interface ServeArgs {
    fjRoot: string;
}

export async function runServe(args: ServeArgs){
    console.log(args);
    
    const buildRootOpts: BuildRootOptions = {
        fjRoot: args.fjRoot
    }

    await buildRoot(buildRootOpts);


}

export function handleServeArgs(): ServeArgs {
    const serveArgs: ServeArgs = {
        fjRoot: path.resolve(process.cwd(), "./fighterjet")
    };

    return serveArgs
}