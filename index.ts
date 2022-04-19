import build from "./src/app";

build({ logger: true }).then((app) => {
  app.listen(app.config.PORT, "0.0.0.0", ( err ) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
  });
}).catch((err) => {
  console.log(err);
  process.exit(1);
});
