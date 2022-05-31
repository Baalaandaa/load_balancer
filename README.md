# Load balancer

### To run
```shell
docker-compose build
docker-compose up --scale target=5
```
Then run spam script(```node spam/index.js```)

Every target's log will be in stdout

![](pic.png)