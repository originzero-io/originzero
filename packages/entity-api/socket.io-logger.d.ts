declare module 'socket.io-logger' {
    import { Writable } from 'stream';
  
    interface SocketIoLoggerOptions {
      stream: Writable; 
      format: (sock: { id: number }, args: any[]) => { socket: number; event_name: string };
    }
  
    function socketIoLogger(options: SocketIoLoggerOptions): void;
  
    export = socketIoLogger;
  }
  