// https://vk.cc/8E0H4r

var VK = require("VK-Promise"),
    vk = new VK(" < token here > ");

// Starting longpoll server
vk.longpoll.start();

// Keywords to delete
let dellast = "ой"; // delete yours last message
let delall = "/delall"; // delete your messages for past 24 hours

// Func to delete messages
let delFunc = function(ids) {
    vk.messages.delete({
        delete_for_all: 1,
        message_ids: ids.toString()
    });
}

// Callback function
vk.on("message", function(event, msg) {

    if(!msg.out) return;
    if(!msg.body.toLowerCase().startsWith(dellast) && msg.body.toLowerCase() != delall) return;

    let thispeer = msg.peer_id;

    vk.messages.getHistory({
        peer_id: thispeer,
        count: 200
    }).then((res) => {
        var ids = [];

        if(msg.body.toLowerCase().startsWith(dellast)) {
              let num = msg.body.toLowerCase().replace(dellast, '').trim();
              if(num && num.match(/[а-яёa-z]/g)) return;

              var lengthTo = 1;
              if(num && num.match(/\d+/)) lengthTo = parseInt(num);

              for(var x = 0; ids.length <= lengthTo; x++) if(res.items[x].out == 1) ids.push(res.items[x].id);
              delFunc(ids);
        } else if(msg.body.toLowerCase() == delall) {
              vk.utils.getServerTime().then((result) => {
                  for(var x = 0; x < res.items.length; x++) {
                      subtract = result - res.items[x].date;
                      if(res.items[x].out && subtract < 86000) ids.push(res.items[x].id);
                  }
                  delFunc(ids);
              });
        }
    });
});
