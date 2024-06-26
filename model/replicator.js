const cron = require('node-cron');
const synchronizer = require('../model/synchronizer.js'); //path to synchronizer file

let replicating1 = false;
let replicating2 = false;
let replicating3 = false;

const replicator_funcs = {
    replicate: async function () {
        console.log('Scheduling replication!')
        cron.schedule('*/10 * * * * *', () => {
            console.log('Starting replication!')
            if (!replicating1) console.log('MESSAGE: Node 1 - BuongPinas currently replicating!');
            if (!replicating2) console.log('MESSAGE: Node 2 - Luzon currently replicating!');
            if (!replicating3) console.log('MESSAGE: Node 3 - Vismin currently replicating!');

            if (!replicating1)
                try {
                    replicating1 = true;
                    var result = synchronizer.centralsync();
                    if (result) replicating1 = false;
                }
                catch (error) {
                    //console.log(error);
                    console.log('ERROR: Failed to connect to node 1!');
                }

            if (!replicating2)
                try {
                    replicating2 = true;
                    var result = synchronizer.fragmentsync(2);
                    if (result) replicating2 = false;
                }
                catch (error) {
                    //console.log(error);
                    console.log('ERROR: Failed to connect to node 2!');
                }
                
            if (!replicating3)
                try {
                    replicating3 = true;
                    var result = synchronizer.fragmentsync(3);
                    if (result) replicating3 = false;
                }
                catch (error) {
                    //console.log(error);
                    console.log('ERROR: Failed to connect to node 3!');
                }
        });
    }//END FUNCTION
}//END CONST

module.exports = replicator_funcs;