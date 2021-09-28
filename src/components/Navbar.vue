<template>
  <div class="navbar">
    <img src="../assets/navbarLogo.png" id="navbarLogo" @click="$router.push('/')" />
    <div id="mainButtons">
      <button id="navButton" class="nav-button" @click="$router.push('/')">Home</button>
      <button id="navButton" class="nav-button" @click="$router.push('/cakes')">Cakes</button>
      <button id="navButton" class="nav-button" @click="$router.push('/about')">About us</button>
    </div>
    <div id="loginButtons">
      <button id="navButton" v-if="Object.entries(user).length === 0" @click="loginDialogOpen = true" flat>Log in</button>
      <!-- If user is not logged in, show login button -->
      <div v-else>
        <button id="navButton" @click="$router.push('/orders')">Orders</button>
        <button id="navButton" @click="$router.push('/profile')" class="profileButton">Profile</button>
        <button id="navButton" @click="logout()">Log out</button>
      </div>
      <hr />
      <button id="cartButton" @click="$router.push('/cart')" circle icon gradient color="primary">
        <i class="bx bx-cart"></i>
      </button>
    </div>

    <vs-dialog id="dialog-1" v-model="loginDialogOpen">
      <template #header>
        <h4 class="not-margin">Log in to your account</h4>
      </template>

      <div class="con-form">
        <vs-input v-model="email" placeholder="Email">
          <template #icon> @ </template>
        </vs-input>
        <vs-input v-model="password" type="password" placeholder="Password">
          <template #icon>
            <i class="bx bxs-lock"></i>
          </template>
        </vs-input>
        <div class="flex">
          <a href="#" @click="forgotPasswordDialogOpen = true">Forgot Password?</a>
        </div>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button @click="login(email, password)" block ref="button"> Sign In </vs-button>

          <div class="new">
            New Here?
            <a href="#" @click="createAccountDialogOpen = true">Create New Account</a>
          </div>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog class="dialog-2" v-model="createAccountDialogOpen">
      <template #header>
        <h4 class="not-margin">Create account</h4>
      </template>

      <div class="con-form">
        <vs-input v-model="createUser.email" placeholder="Email">
          <template #icon> @ </template>
        </vs-input>
        <vs-input v-model="createUser.name" placeholder="Full name">
          <template #icon>
            <i class="bx bx-rename"></i>
          </template>
        </vs-input>
        <vs-input v-model="createUser.password" type="password" placeholder="Password">
          <template #icon>
            <i class="bx bxs-lock"></i>
          </template>
        </vs-input>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button @click="createAccount(createUser.email, createUser.name, createUser.password)" block> Create account </vs-button>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog class="dialog-2" v-model="forgotPasswordDialogOpen">
      <template #header>
        <h4 class="not-margin">Reset your password</h4>
      </template>

      <div class="con-form">
        <vs-input placeholder="Email">
          <template #icon> @ </template>
        </vs-input>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button block> Reset password </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'Navbaren',
  data() {
    return {
      loginDialogOpen: false,
      createAccountDialogOpen: false,
      forgotPasswordDialogOpen: false,
      email: 'Laverne.Harvey@yahoo.com',
      password: 'bHO_3U3aPM_B38Q',
      createUser: {
        name: '',
        email: '',
        password: '',
      },
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions([
      'setUser', // map `this.login({email, password})` to `this.$store.commit('setUser', {email, password})`
    ]),
    ...mapMutations({
      logout: 'forgetUser',
    }),
    async login(email, password) {
      const loading = this.$vs.loading({
        target: this.$refs.button,
        scale: '0.6',
        background: 'primary',
        opacity: 1,
        color: '#fff',
      });
      try {
        await this.setUser({ email, password });
      } catch (error) {
        console.error(error);
        this.notifyError('Something went wrong', 'You could not be logged in');
      }
      loading.close();
      this.loginDialogOpen = false;
    },
    async createAccount(email, name, password) {
      if (!email.includes('@')) {
        this.notifyError('Invalid Email', 'You need to input a valid email adress');
        return;
      } else if (password.length < 8) {
        this.notifyError('Password too short', 'You password must be at least 8 characters long');
        return;
      } else {
        let timeElapsed = Date.now();
        let timestamp = new Date(timeElapsed);
        let post = {
          name: name,
          email: email,
          password: password,
          timestamp: timestamp.toISOString(),
          avatar: 'https://cdn.fakercloud.com/avatars/mds_128.jpg',
        };
        try {
          await axios.post('http://localhost:3000/customers', post);
        } catch (error) {
          console.error(error);
          this.notifyError('Something went wrong', 'Your account could not be created');
        }
        this.login(email, password);
        this.createAccountDialogOpen = false;
      }
    },
    notifyError(title, text) {
      this.$vs.notification({
        color: 'danger',
        position: 'top-right',
        title: title,
        text: text,
      });
    },
  },
};
</script>

<style lang="scss">
.navbar {
  display: flex;
  flex-direction: row;
  z-index: 1;
  height: 6.7vw;
  width: 70vw;
  margin-left: 15vw;
  transition: 200ms;
  #mainButtons {
    margin-left: 2vw;
    text-align: center;
  }
  #navButton {
    background-color: transparent;
    border: none;
    font-family: 'Poppins';
    font-weight: bold;
    color: #fff3e1;
    font-size: 1.15vw;
    letter-spacing: 0.05vw;
    margin: 1vw;
    display: inline-block;
    transform-origin: center;
  }
  #navButton:after {
    display: block;
    content: '';
    border-bottom: solid 3px #fff3e1;
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }
  #navButton:hover:after {
    transform: scaleX(1);
  }
  .nav-button {
    padding-top: 1.5vw;
  }
  #loginButtons {
    align-items: center;
    flex-direction: row;
    display: flex;
    right: 0;
    margin-left: auto;
  }
  #loginButtons hr {
    background-color: #fff3e1;
    height: 2.2vw;
    width: 0.1vw;
    border: none;
  }
  #cartButton {
    background-color: transparent;
    color: #fff3e1;
    border: none;
    font-size: 2.5vw;
    margin: 1vw;
  }
  #profileLogo {
    cursor: default;
    font-size: 1.5vw;
    margin-right: 0;
    background-color: transparent;
    color: #fff3e1;
    border: none;
  }
}
.vs-dialog {
  .con-form {
    width: 100%;
    .flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
      a {
        font-size: 0.8rem;
      }
    }
    .vs-checkbox-label {
      font-size: 0.8rem;
    }
    .vs-input-content {
      margin: 10px 0px;
      width: 100%;
      .vs-input {
        width: 100%;
      }
    }
  }
  .footer-dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    .new {
      margin: 0px;
      margin-top: 20px;
      padding: 0px;
      font-size: 0.7rem;
    }
  }
  a {
    text-decoration: none;
    opacity: 0.7;
    color: #000;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
