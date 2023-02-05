<h1 align="center">
  JSONExpress
</h1>
<p align="center">
  <i>A simple JSON database that offers no encryption and compression whatsoever</i>
</p>

### State
This project is still in development and its definetly not finished, so 
if you wanna use it for some reason be careful as it **might not be secure**

### Setup
```
git clone https://github.com/ngn13/jsonexpress.git
cd jsonexpress
npm i
node index.js --show-token
```

### Usage
You can control the database with web requests on port 6678 (if you are using the default port).
To write a file, send a POST request to `/write` with the following data:
```
{"token":"YOUR_TOKEN_HERE", "file":"FILE_NAME_HERE", "data":{"JSON":"DATA_HERE"}}
```
To read a file, send a POST request to `/read` with the following data:
```
{"token":"YOUR_TOKEN_HERE", "file":"FILE_NAME_HERE"}
```

### Arguments
Here are the CLI args:
- `--show-token`: show database token
- `--port`: change the web server port
- `--db`: change the folder that database gets stored in, default is `./db`
- `--debug`: show debug output
