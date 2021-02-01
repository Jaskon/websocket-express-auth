WebSocket.prototype.sendMessage = function(type, data) {
  this.send(wsDataSerialize(type, data))
};

const wsAddress = 'ws://localhost:3000';
const wsReconnectDelay = 1000;
const wsReconnectTries = 10;
let reconnectTriesRemaining;
resetReconnectTries();
let ws;

wsConnect();

function wsConnect() {
  ws = new WebSocket(wsAddress);
  ws.addEventListener('open', (ev) => {
    resetReconnectTries();
    ws.sendMessage('meta', '[Client] Connected!')
    console.log(`Connected to ws on '${wsAddress}'`);
  });

  ws.addEventListener('error', errorHandler);

  ws.addEventListener('message', (ev) => {
    // Parse message
    const {type, data} = wsDataDeserialize(ev.data);
    console.log(`Message of type ${type} from server:`, data);

    // Communication
    chatEvents(type, data);
    fileEvents(type, data);
  });
}


function resetReconnectTries() {
  reconnectTriesRemaining = wsReconnectTries;
}

// Reconnect on connection broken
function errorHandler(e) {
  setTimeout(() => {
    if (reconnectTriesRemaining-- <= 0) {
      console.log(`Tried to reconnect ${wsReconnectTries} times. Disconnected forever`);
    }

    wsConnect();
  }, wsReconnectDelay);
  console.log(`Connection error. Reconnecting after ${wsReconnectDelay}ms...`);
}
