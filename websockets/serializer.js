function serialize(type, data) {
  return JSON.stringify([type, data]);
}

function deserialize(message) {
  const [type, data] = JSON.parse(message);
  return { type, data };
}


module.exports = {
  serialize,
  deserialize
}
