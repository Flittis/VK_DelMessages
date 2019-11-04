// https://vk.cc/8E0H4r

var VK = require("VK-Promise"),
    vk = new VK(" < token > ");

// Starting longpoll server
vk.longpoll.start();

// Keywords to delete
let dellast = "ой", // delete yours last message
    delall = "/delall", // delete your messages for past 24 hours
    editto = " "; // message will be edited to this text

// Waiting for message...
vk.on("message", onMessage);

function onMessage(event, msg) {
    if(!msg.out) return;
    if(!msg.body.toLowerCase().startsWith(dellast) && msg.body.toLowerCase() != delall) return;

    vk.messages.getHistory({peer_id: msg.peer_id, count: 200})
      .then((res) => {
          var ids = [];

          if(msg.body.toLowerCase().startsWith(dellast)) {
                var lengthTo = 1, isEdit = false;

                if(msg.body.includes("-")) isEdit = true;
                let num = msg.body.toLowerCase().replace(dellast, '').replace("-", "").trim();
                if(num && num.match(/[0-9]+/g)) lengthTo = parseInt(num);
                else if(num) return;

                if(lengthTo < 1) return;

                for(var x = 0; ids.length <= lengthTo; x++) {
                  if(res.items[x].out == 1) ids.push(res.items[x].id);

                  if(res.items[x].out == 1 && isEdit && x != 0) vk.messages.edit({ peer_id: msg.peer_id, message_id: res.items[x].id, message: editto });
                }

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
}

// Func to delete messages
function delFunc(ids) { vk.messages.delete({ delete_for_all: 1, message_ids: ids.toString() }); }
