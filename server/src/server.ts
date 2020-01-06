import "reflect-metadata";
import * as dotenv from "dotenv";
import app from "./app";
import * as https from "https";
import * as http from "http";
import * as fs from "fs";
import { sequelize } from "db.scheme";
import Environment from "./environment";
dotenv.config();

type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

(async () => {
  try {
    await sequelize.sync();
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return;
  }
  const httpsOptions = {
    key: fs.readFileSync("./src/core/certificate/private.key"),
    cert: fs.readFileSync("./src/core/certificate/certificate.crt"),
    ca: fs.readFileSync("./src/core/certificate/ca_bundle.crt", "utf8")
  };
  const httpsServer = https
    .createServer(httpsOptions, app)
    .listen(Environment.httpsPort, () => {
      console.log(
        "Express https server listening on port " + Environment.httpsPort
      );
    });
  const httpServer = http.createServer(app).listen(Environment.httpPort, () => {
    console.log(
      "Express http server listening on port " + Environment.httpPort
    );
  });
  console.log("NODE_ENV:", Environment.nodeEnv);
  if (Environment.nodeEnv === "development" && module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
      httpServer.close();
      httpsServer.close();
    });
  }
})();
