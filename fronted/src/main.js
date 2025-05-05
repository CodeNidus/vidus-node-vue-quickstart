import { createApp } from "vue"
import App from "./App.vue"
import { VidusCreator } from "vidus-vue"

import userHelperTokenRequestHelper from "./utils/userToken"

const videoconference = VidusCreator({
    overrides: {
        helper: {
            userToken: {
                request: userHelperTokenRequestHelper,
            }
        }
    }
})

const app = createApp(App)

app.use(videoconference)
    .mount("#app")
