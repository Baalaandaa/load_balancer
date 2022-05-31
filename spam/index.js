const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

setInterval(async () => {
    fetch("http://localhost:3000/echo?id=5");
}, 10)