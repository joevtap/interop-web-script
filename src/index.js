const express = require('express');
const path = require('path');
const { spawn } = require('child_process')

const app = express();
app.use(express.json())

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './views/index.html'));
});

app.post('/hello-world', function (req, res) {
  const ls = spawn('python', ['src/scripts/hello_world.py', req.body.message]);

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

  res.sendStatus(200)
})

app.listen(3000, () => {
  console.log('Listening port 3000')
})