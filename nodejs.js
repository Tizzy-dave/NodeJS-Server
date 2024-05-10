const http = require('http');
const os = require('os');

// Function to generate a random delay
const randomDelay = () => Math.floor(Math.random() * 1000);

// Function to handle the GET request
const handleGetRequest = (req, res) => {
    // Simulate asynchronous operation with random delay
    setTimeout(() => {
        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        
        // Gather information about CPU and OS
        const cpuInfo = os.cpus();
        const osInfo = {
            platform: os.platform(),
            release: os.release(),
            totalMemory: os.totalmem(),
            freeMemory: os.freemem(),
            uptime: os.uptime()
        };

        // Send the response
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ cpuInfo, osInfo }));
    }, randomDelay());
};

// Create the HTTP server
const server = http.createServer((req, res) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.writeHead(200);
        res.end();
        return;
    }

    // Handle GET requests
    if (req.method === 'GET') {
        handleGetRequest(req, res);
    } else {
        // Handle unsupported HTTP methods
        res.writeHead(405);
        res.end('Method Not Allowed');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
