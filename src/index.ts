import "reflect-metadata";
import * as express from "express";
import * as bodyparser from "body-parser";
import helmet from "helmet";
import * as cors from "cors";
import routes from "./routes"
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
    .then(() => {
        const app  = express();

        // call middlewares
        app.use(cors());
        app.use(helmet());
        app.use(bodyparser.json())

        // set all routes from routes folder
        app.use("/", routes);

        app.listen(3030, () => {
            console.log("Server running on port 3030");
        })
    })
    .catch(error => console.log(error));

