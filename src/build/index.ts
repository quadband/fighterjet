import * as path from "path";
import { PluginOption, build, defineConfig } from "vite";
import solid from 'vite-plugin-solid'
import { nodeResolve } from "@rollup/plugin-node-resolve";

export function runBuild(){

}

export interface BuildRootOptions {
    fjRoot: string;
}

export async function buildRoot(opts: BuildRootOptions){

    const fjEntry = path.resolve(opts.fjRoot, "./index.tsx");

    const config = defineConfig({
        root: opts.fjRoot,
        plugins: [solid()],
        build: {
            rollupOptions: {
                input: fjEntry,
                output: {
                    preserveModules: true,
                    entryFileNames: "[name].js",
                    plugins: [
                        {
                            name: "no-files-pls",
                            generateBundle(_, bundle){
                                console.log(bundle);
                            }
                        }
                    ]
                },
                preserveEntrySignatures: 'strict',
                treeshake: false,
                //@ts-ignore
                plugins: [nodeResolve()],
                external: [/node_modules/]
            }
        }
    });

    const output = await build(config);
}