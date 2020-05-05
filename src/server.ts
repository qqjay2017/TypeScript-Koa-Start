import app from './app';
const chalk = require('chalk');

// console.log(process.env.PORT)
// console.log(process.env.NODE_ENV)
const server = app.listen(process.env.PORT || 3000,
    () => {
        console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), process.env.PORT, process.env.NODE_ENV);
        console.log('  Press CTRL-C to stop\n');
    }
)

export default server