import { FoundryLoader } from './src/engine/FoundryLoader.js'; const loader = new FoundryLoader(); loader.load().then(() => console.log('Loaded keys:', [...loader.index.keys()].length));
