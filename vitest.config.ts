import {fileURLToPath, URL} from "node:url";
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            reportsDirectory: './test/coverage',
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./', import.meta.url)),
        },
    },
})