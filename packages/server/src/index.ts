// Modules
import path from 'path';
// import fs from 'fs';

import { Server } from './modules/Server';

// Routes

// Configs
// const SSL = {
//   cert: fs.readFileSync(path.resolve('ssl/server.crt')),
//   key: fs.readFileSync(path.resolve('ssl/server.key')),
// };
const DIST = path.resolve('../../node_modules/client/lib');

// Initialize modules
const server = new Server({
  port: 3100,
  distPath: DIST,
  // ssl: SSL
});

// Initialize
server.init();

// Routes
// server.registerRoutes([
// ]);