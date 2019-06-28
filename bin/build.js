const program = require("commander");
const MPB = require("mpbuild");
const chalk = require("chalk");
const perf = require("execution-time")();
const mbpConfig = require("../mbp.config");
const { formatBuildTime } = require("./util.js");
perf.start("build");
program
  .version("0.0.1")
  .option("-u, --uglify", "uglify js code")
  .option("-w, --watch", "watch.")
  .parse(process.argv);
const needUglify = !!program.uglify;
const mbp = new MPB(mbpConfig("./src/app.json", { needUglify }));
if (program.watch) {
  mbp.watch();
  console.log(
    chalk.green("构建watch,耗时:", formatBuildTime(perf.stop("build").time))
  );
} else {
  mbp.run().then(() => {
    console.log(
      chalk.blue("构建完成,耗时:", formatBuildTime(perf.stop("build").time))
    );
  });
}
