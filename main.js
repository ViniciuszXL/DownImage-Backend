const server = require('./server/server');

// Starting the API... //
server.start().then(res => {
    console.log(`Sucessfully starting the server!!`);
}).catch(err => {
    console.error(err);
})