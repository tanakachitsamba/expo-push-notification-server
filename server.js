const expo = require('expo-server-sdk')

const { EXPO_TOKEN } = process.env
const somePushTokens = [EXPO_TOKEN]

// new Expo client
let expo = new Expo()

// Create the messages that you want to send to clents
let messages = []
for (let pushToken of somePushTokens) {
    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`)
        continue
    }

    // Construct a message
    messages.push({
        to: pushToken,
        sound: 'default',
        body: 'real Gs move in silence like lasagna',
        data: { withSome: 'data' },
        batch: 0,
    })
}

// create chunks of messages
let chunks = expo.chunkPushNotifications(messages)
;(async () => {
    // loop chunks
    for (let chunk of chunks) {
        try {
            let receipts = await expo.sendPushNotificationsAsync(chunk)
            console.log(receipts)
        } catch (error) {
            console.error(error)
        }
    }
})()
