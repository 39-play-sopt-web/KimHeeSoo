interface importMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_API_KEY: string;
}

interface ImportData {
    readonly env: ImportMetaEnv;
}
