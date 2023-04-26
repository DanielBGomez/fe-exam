// Modules
import express, { json, static as Static, Express, Router } from 'express';
import http from 'http';
import https from 'https';
import cors from 'cors';
import helmet from 'helmet';
import { EventEmitter } from 'stream';

// Types
interface ssl {
  cert: Buffer,
  key: Buffer
}
interface ServerProps {
  corsOptions?: object,
  socketOptions?: object,
  ssl?: ssl,
  port?: number,
  distPath?: string,
}

// Configs
const DEFAULT_PORT = 3100;

/**
 * Server 
 */
export class Server extends EventEmitter {
  private _App?: Express;
  private _Server?: http.Server | https.Server;

  public port = DEFAULT_PORT;
  public ssl?: ssl;
  public distPath?: string;

  public corsOptions?: object;
  public socketOptions?: object;

  /* eslint-disable-next-line require-jsdoc */
  constructor (props: ServerProps) {
    super();
    // Configs
    this.port = props.port || DEFAULT_PORT;
    this.ssl = props.ssl;
    this.distPath = props.distPath;

    this.corsOptions = props.corsOptions;
    this.socketOptions = props.socketOptions;
  }
  
  /**
   * Initialize the server.
   */
  async init (props?: ServerProps) {
    // App
    this._App = express();

    // Middlewares
    this._App.use(cors(props?.corsOptions || this.corsOptions));
    this._App.use(helmet());
    this._App.use(json());
    this._App.use(Static(props?.distPath || this.distPath || 'public', { index: false }));

    // Server
    const ssl = props?.ssl || this.ssl;
    this._Server = ssl ? 
      https.createServer({
        cert: ssl.cert,
        key: ssl.key
      }, this._App) :
      http.createServer(this._App);
    
    // Start
    this._Server.listen(props?.port || this.port);

    console.log(`Server listening on port ${props?.port || this.port}`);
    return this;
  }
  /**
   * Register routes into the express server.
   */
  registerRoutes (routes: Router | Array<Router>) {
    if (!this._App) console.log('App is not defined');
    if (Array.isArray(routes)) {
      console.log(`Registering ${routes.length} routes`);
      return routes.forEach(route => {
        this._App?.use(route);
        console.log('- Route added.');
      });
    }
    this._App?.use(routes);
    console.log('Route added.');
  } 
}
