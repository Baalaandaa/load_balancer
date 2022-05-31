const fs = require("fs");
const url = require('url');

class Instance {

    constructor(address) {
        this.address = address
        this.activeRequests = 0
    }

}

let instances = []

function load() {
    const rawdata = fs.readFileSync('instances.json');
    let instance_objects = JSON.parse(rawdata);
    instance_objects.forEach((obj) => {
        instances.push(new Instance(obj));
    })
}

function getInstance() {
    return instances.reduce((old, curr) => {
        if(!old || old.activeRequests > curr.activeRequests) {
            return curr;
        } else {
            return old;
        }
    });
}

function remove(instance) {
    const index = instances.indexOf(instance);
    if(index !== -1) {
        instances.splice(index, 1);
    }
}

module.exports = {
    load, getInstance, remove
}