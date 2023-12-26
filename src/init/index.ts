
export interface InitArgs {
    dir: string;
    force: boolean;
}

export function runInit(args: InitArgs){
    console.log(args);
}

export function handleInitArgs(args: Partial<InitArgs>): InitArgs {
    const initArgs: InitArgs = {
        dir: args.dir || ".",
        force: args.force || false
    };

    return initArgs;
}