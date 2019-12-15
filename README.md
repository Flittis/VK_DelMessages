# Bot for deleting messages

## Getting Started

### Prerequisites

Before everything, you must to install Node.js

https://nodejs.org



### Installing script

Firstly, clone:
```
git clone https://github.com/Flittis/VK_DelMessages.git
```

Then go to the folder that you clonned, and type:
```
npm install
```

After this, follow the link:

https://vk.cc/8E0H4r

**Accept everything**, and copy the access token from adress line.

![alt text](https://storage.flittis.xyz/firefox_UVG6pYEy5y.jpg)

Then open **index.js** with any code-editor, and find 4-th line.
```
var VK = require("VK-Promise"),
    vk = new VK(" < token here > ");
```
And replace **< token here >** with token, that you copied before.

### Running script

Open the command prompt in folder with script, and type:
```
node index.js
```
