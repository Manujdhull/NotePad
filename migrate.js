require('ts-node/register');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('./umzug.ts').migrator.runAsCLI();
