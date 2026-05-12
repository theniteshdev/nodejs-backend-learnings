import http from "node:http";

const agentOff = new http.Agent({ keepAlive: false });
const agentOn = new http.Agent({ keepAlive: true });

async function makeRequests(agent, label) {
    console.time(label); // Timer shuru

    const tasks = [];
    for (let i = 0; i < 10000; i++) {
        tasks.push(new Promise((resolve) => {
            http.get({
                hostname: 'localhost',
                port: 3000,
                path: '/',
                agent: agent
            }, (res) => {
                res.on('data', () => { }); // Data consume karna zaroori hai
                res.on('end', resolve);
            });
        }));
    }

    await Promise.all(tasks);
    console.timeEnd(label); // Timer khatam
}

async function runTest() {
    console.log("Starting test...");
    await makeRequests(agentOff, "Test-Without-Agent");
    await makeRequests(agentOn, "Test-With-Agent");
}

runTest();