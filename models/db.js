const mysql = require('mysql');
const dotenv = require('dotenv');
const Sequelize = require('sequelize');

dotenv.config();

    //connection pool for node1 (central node)
    //change database name and host when using vm
const node1 = new Sequelize(
    'stadvdb_mco2', 
    'server0',
    'password',
    {
        host: 'ccscloud.dlsu.edu.ph', 
        port: '20087',
        dialect: 'mysql'
    }
);

const node2 = new Sequelize(
    'stadvdb_mco2',
    'server1',
    'password',
    {
        host: 'ccscloud.dlsu.edu.ph', 
        port: '20088',
        dialect: 'mysql'
    }
);

const node3 = new Sequelize(
    'stadvdb_mco2',
    'server2',
    'password',
    {
        host: 'ccscloud.dlsu.edu.ph', 
        port: '20089',
        dialect: 'mysql'
    }
);

// FOR NON VM MACHINE
// const node1 = new Sequelize(
//     'central_nodes', 
//     process.env.SERVER0_USER,
//     process.env.SERVER0_PASS,
//     {
//         host: 'localhost', 
//         dialect: 'mysql'
//     }
// );

// const node2 = new Sequelize(
//     'luzon',
//     process.env.SERVER1_USER,
//     process.env.SERVER1_PASS,
//     {
//         host: 'localhost',
//         dialect: 'mysql'
//     }
// );

// const node3 = new Sequelize(
//     'south',
//     process.env.SERVER2_USER,
//     process.env.SERVER2_PASS,
//     {
//         host: 'localhost',
//         dialect: 'mysql'
//     }
// );

node1.authenticate().then(() => {
    console.log('Connection to Node 1 server has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to Node 1 server: ', error);
});

// node1.close()
//     .then(() => {
//         console.log('Connection closed successfully.');
//     })
//     .catch(err => {
//         console.error('Error occurred while closing connection:', err);
//     });

node2.authenticate().then(() => {
    console.log('Connection to Node 2 server has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to Node 2 server: ', error);
});

node3.authenticate().then(() => {
    console.log('Connection to Node 3 server has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to Node 3 server: ', error);
});

module.exports = { node1, node2, node3 };