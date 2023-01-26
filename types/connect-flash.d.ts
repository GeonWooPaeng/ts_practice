declare module 'connect-flash' {
  global {
    namespace Express {
      interface Request {
        flash(message: string): void;
        flash(event: string, message: string): void;
        flash(): { [key: string]: string[] };
      }
    }
  }
  import express = require('express');
  function flash(): Express.RequestHandler;
  export default flash;
}
