import * as express from "express";
import * as cors from "cors";
import { connect } from "./routes";
import { DefaultErrorMiddleware } from "core/middlewares/default-error.middleware.ts";
import * as helmet from "helmet";
class App {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
    connect(this.app);
    this.app.use(DefaultErrorMiddleware);
  }
}
export default new App().app;
