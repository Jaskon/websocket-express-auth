function wsDataSerialize(type, data) {
  return JSON.stringify([type, data]);
}

function wsDataDeserialize(message) {
  const [type, data] = JSON.parse(message);
  return { type, data };
}
