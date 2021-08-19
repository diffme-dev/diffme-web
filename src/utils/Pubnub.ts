import config from "src/config";
import PubNub from "pubnub";

const pubnub = new PubNub({
    subscribeKey: config.pubnubSubscribeKey,
    publishKey: config.pubnubPublishKey,
});

export default pubnub;
