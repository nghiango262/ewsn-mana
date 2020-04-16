import { Alert } from "react-native";
import {apiConfig} from '../config'
import init from "./mqtt";

init();

class MqttService {
  static instance: any;
  client: any;
  callbacks: any;
  onSuccessHandler: any;
  onConnectionLostHandler: any;
  isConnected: boolean;

  static getInstance() {
    if (!MqttService.instance) {
      MqttService.instance = new MqttService();
    }

    return MqttService.instance;
  }

  constructor() {
    const clientId = "MqttTutorial";

    this.client = new Paho.MQTT.Client(apiConfig.mqttUri, clientId);

    this.client.onMessageArrived = this.onMessageArrived;

    this.callbacks = {};

    this.onSuccessHandler = undefined;

    this.onConnectionLostHandler = undefined;

    this.isConnected = false;
  }

  connectClient = (onSuccessHandler: any, onConnectionLostHandler: any) => {
    this.onSuccessHandler = onSuccessHandler;

    this.onConnectionLostHandler = onConnectionLostHandler;

    this.client.onConnectionLost = () => {
      this.isConnected = false;

      onConnectionLostHandler();
    };

    this.client.connect({
      timeout: 10,

      onSuccess: () => {
        this.isConnected = true;

        onSuccessHandler();
      },

      useSSL: false,

      onFailure: this.onFailure,

      //reconnect: true,

      keepAliveInterval: 20,

      cleanSession: true
    });
  };

  onFailure = (error: any) => {
    console.info(error.errorMessage);

    this.isConnected = false;

    Alert.alert(
      "Caution",
      "Could not connect to MQTT",
      [
        {
          text: "TRY AGAIN",
          onPress: () =>
          this.connectClient(
            this.onSuccessHandler,
            this.onConnectionLostHandler
          )
        },
      ],
    );
  };

  onDisconnectClient = () => {
    this.client.disconnect()
  }

  onMessageArrived = (message: any) => {
    const { payloadString, topic } = message;

    this.callbacks[topic](payloadString);
  };

  publishMessage = (topic: any, message: any) => {
    if (!this.isConnected) {
      console.info("not connected");

      return;
    }

    this.client.publish(topic, message);
  };

  subscribe = (topic: string, callback: any) => {
    if (!this.isConnected) {
      console.info("not connected");

      return;
    }

    this.callbacks[topic] = callback;

    this.client.subscribe(topic);
  };

  unsubscribe = (topic: string) => {
    if (!this.isConnected) {
      console.info("not connected");

      return;
    }

    delete this.callbacks[topic];

    this.client.unsubscribe(topic);
  };
}

export const mqttService =  MqttService.getInstance();