import * as Mqtt from 'react-native-native-mqtt';

const client = new Mqtt.Client('ws://ewsn-mqtt.herokuapp.com:80');

client.connect({
    clientId: 'CLIENT_ID'
}, err => {});

client.on(Mqtt.Event.Message, (topic: string, message: Buffer) => {
    console.log('Mqtt Message:', topic, message.toString());
});

client.on(Mqtt.Event.Connect, () => {
    console.log('MQTT Connect');
    client.subscribe(['#'], [0]);
});

client.on(Mqtt.Event.Error, (error: string) => {
    console.log('MQTT Error:', error);
});

client.on(Mqtt.Event.Disconnect, (cause: string) => {
    console.log('MQTT Disconnect:', cause);
});