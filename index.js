// https://vk.cc/8E0H4r

var VK = require("VK-Promise"),
    vk = new VK(" < token here > ");

console.log("Auth successfull!");

// Starting longpoll server
vk.longpoll.start();

console.log("Longpoll started successfully!");

// Keywords to delete
let dellast = "oops"; // delete yours last message
let delall = "/delall"; // delete your messages for past 24 hours

// Callback function
vk.on("message", function(event, msg) {

    if(!msg.out) return;

    let thispeer = msg.peer_id;
    var ids = [];

    vk.messages.getHistory({
        peer_id: thispeer,
        count: 200
    }).then((res) => {
        if(msg.body.toLowerCase() == dellast)
              for(var x = 0; ids.length <= 1; x++) if(res.items[x].out == 1) ids.push(res.items[x].id);
        else if(msg.body.toLowerCase() == delall) {
            vk.utils.getServerTime().then((result) => {
                for(var x = 0; x < res.items.length; x++) {
                    subtract = result - res.items[x].date;
                    if(res.items[x].out == 1 && subtract < 86000) ids.push(res.items[x].id);
                }
            });
        }

        vk.messages.delete({
            delete_for_all: 1,
            message_ids: ids.toString()
        });
    });

})
