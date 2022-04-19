import build from "./app";

const app = build({ logger: true });

app.listen(1488, "0.0.0.0", ( err ) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});
