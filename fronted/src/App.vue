<template>
  <div>
    <div
      class="demo-navbar"
      :class="{ tiny: token }"
    >
      <div class="header">
        <h1>Vidus Demo</h1>
        <p class="subtitle">Vidus node.js + vue Quickstart</p>
      </div>

      <div class="user-info">
        <div
            v-if="!token"
            class="text-field"
            :class="{ error: !userEmailIsValid }"
        >
          <label>E-mail</label>
          <input
              id="usernameField"
              v-model="username"
              type="email"
          />
        </div>
        <div v-else class="username-label">
          <label>{{ username }}</label>
        </div>
      </div>

      <button
        v-if="!token"
        @click="getUserToken"
        :disabled="!userEmailIsValid || loading"
      >
        Get Token
      </button>
      <button
          v-else
          @click="clearUserToken"
      >
        Remove Token
      </button>
    </div>

    <div class="divider"></div>

    <div
      v-if="!token"
      class="card welcome-box"
    >
      <div class="title">
        Welcome to the Vidus WebRTC Video Conference Demo Module, a powerful and intuitive component built using the
        <span>Vue.js</span> library.
      </div>
      <div>
        <ol>
          <li>Enter your desired e-mail address and get access demo token</li>
          <li>Create your first room in project</li>
          <li>Get rooms list from server</li>
          <li>Select created room, join & enjoy!</li>
        </ol>
      </div>
      <p>
        <span>Vidus</span> is a JavaScript-based video conferencing toolkit designed to seamlessly integrate real-time video communication into your web and mobile applications with minimal effort. Whether you're developing for browsers or mobile platforms, Vidus empowers you to embed high-quality <span>video conferencing</span> capabilities in just a matter of minutes.
      </p>
      <p>
        With Vidus, you have the flexibility to tailor and enhance your video conferencing experience by easily adjusting a wide range of setup parameters. From <span>customizing layouts</span> and controls to enabling advanced features like <span>screen sharing</span> and more, Vidus provides the tools you need to create a fully personalized and professional video conferencing solution tailored to your specific requirements.
      </p>
      <p class="slogan">
        Dive in and explore the endless possibilities Vidus has to offer!
      </p>
      <div>
        <a href="https://codenidus.github.io/vidus-documentation/" target="_blank" class="btn btn-outline">Documentation</a>
      </div>
    </div>
    <div v-else>
      <VCRooms
        v-if="!roomId"
        @onSelectRoom="setRoomId"
      />

      <VCRoomJoin
        v-else
        :room-id="roomId"
        @onCloseConference="closeConference"
      />
    </div>
  </div>
</template>

<script>
import { nextTick } from "vue";

export default {
  name: 'App',
  inject: ['webrtc'],
  computed: {
    userEmailIsValid() {
      return (!!this.username && this.validateEmail(this.username));
    }
  },
  data() {
    return {
      roomId: null,
      username: 'test@test.com',
      showRooms: false,
      token: null,
      loading: false,
    }
  },
  mounted() {
    this.checkUrlParams();
    this.clearUserToken();
  },
  methods: {
    setRoomId(room_id) {
      this.roomId = room_id;
      this.showRooms = false;
    },
    checkUrlParams() {
      const url = new URL(window.location.href);
      const queryParams = url.searchParams;

      if (queryParams.has('room_id')) {
        this.setRoomId(queryParams.get('room_id'));
      }
    },
    getUserToken() {
      this.loading = true;

      this.webrtc.getUserToken(token => {
        this.token = token;
        this.loading = false;
      }, error => {
        console.log(error);
      })
    },
    clearUserToken() {
      this.webrtc.emit('onTerminateConference');
      this.webrtc.helpers.userToken.removeToken();

      nextTick(() => {
        this.roomId = null;
        this.token = null;
      });
    },
    validateEmail(email) {
      return email.match(
          /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    },
    closeConference() {
      this.roomId = null;
    },
  },
}
</script>

<style lang="scss">
.demo-navbar {
  display: flex;
  width: 100%;
  font-size: 1rem;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 20px;

  @media screen and (max-width: 480px) {
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;

    .text-field {
      input {
        min-width: unset;
      }
    }
  }

  .header {
    padding: 0 50px;

    h1 {
      font-size: 2em;
      margin: 0;
      transition: .4s all;
    }

    .subtitle {
      font-size: .9em;
      margin: 0;
      transition: .4s all;
    }

    @media screen and (max-width: 480px) {
      display: flex;
      gap: 20px;
      align-items: center;
      padding: 0;

      h1 {
        font-size: 1.5em;
      }
    }
  }

  .username-label {
    margin: 10px 0;
  }

  &.tiny {

    align-items: center;
    @media screen and (max-width: 480px) {
      justify-content: space-between;
    }

    .header {
      h1 {
        font-size: 1.5em;

        @media screen and (max-width: 480px) {
          font-size: 1.2em;
        }
      }

      .subtitle {
        font-size: 0.7em;

        @media screen and (max-width: 480px) {
          display: none;
        }
      }
    }

    .user-info {
      @media screen and (max-width: 480px) {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-align: center;
      }
    }

    button {
      @media screen and (max-width: 480px) {
        padding: 5px 8px;
      }
    }
  }
}

.welcome-box {
  max-width: 850px;
  margin: 50px auto 0 auto;

  .title {
    font-size: 1.5rem;
    font-weight: bold;

    span {
      color: #41B883;
    }
  }

  ol {
    li {
      list-style: decimal;
    }
  }

  p {
    span {
      font-weight: bold;
      font-style: italic;
    }

    &.slogan {
      font-weight: bold;
    }
  }
}

</style>