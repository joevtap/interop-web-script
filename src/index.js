const express = require('express');
const open = require('open');
const path = require('path');
const { spawn } = require('child_process')

const app = express();
app.use(express.json())

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './views/index.html'));
});


app.post('/hello-world', function (req, res) {
  const pythonScript = spawn('python', [path.resolve(process.cwd(), 'src/scripts/hello_world.py'), req.body.message]);

  pythonScript.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  pythonScript.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonScript.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

  res.sendStatus(200)
})

app.listen(6700, () => {
  open('http://localhost:6700')
})