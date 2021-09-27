<template>
  <div class="navbar">
    <vs-navbar not-line target-scroll="#padding-scroll-content" padding-scroll v-model="active">
      <template #left>
        <img src="../assets/logo.png" alt="" @click="$router.push('/')" />
      </template>
      <vs-navbar-item :active="$route.path == '/'" to="/"> Home </vs-navbar-item>
      <vs-navbar-item :active="$route.path == '/cakes'" to="/cakes"> Cakes </vs-navbar-item>
      <vs-navbar-item :active="$route.path == '/about'" to="/about"> About us </vs-navbar-item>
      <template #right>
        <vs-button circle v-if="Object.entries(user).length === 0" @click="loginDialogOpen = true">Log in</vs-button>
        <vs-button icon circle to="/cart">
          <i class="bx bx-cart"></i>
        </vs-button>
        <vs-navbar-group v-if="Object.entries(user).length !== 0">
          <vs-button circle icon gradient color="primary">
            <i class="bx bx-user"></i>
          </vs-button>
          <template #items>
            <vs-navbar-item to="/orders" :active="$route.path == '/orders'"> Orders </vs-navbar-item>
            <vs-navbar-item to="/profile" :active="$route.path == '/profile'"> Profile </vs-navbar-item>
            <vs-navbar-item @click="logout()"> Log out </vs-navbar-item>
          </template>
        </vs-navbar-group>
      </template>
    </vs-navbar>
    <div id="padding-scroll-content" class="square">
      <div class="child">child 1</div>
      <div class="child">child 2</div>
      <div class="child">child 3</div>
    </div>
    <vs-dialog id="dialog-1" vs-theme="dark" v-model="loginDialogOpen">
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
    <vs-dialog class="dialog-2" vs-theme="dark" v-model="createAccountDialogOpen">
      <template #header>
        <h4 class="not-margin">Create account</h4>
      </template>

      <div class="con-form">
        <vs-input>
          <template #icon> @ </template>
        </vs-input>
        <vs-input type="password">
          <template #icon>
            <i class="bx bxs-lock"></i>
          </template>
        </vs-input>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button block> Create account </vs-button>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog class="dialog-2" vs-theme="dark" v-model="forgotPasswordDialogOpen">
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
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'Navbar',
  data() {
    return {
      active: 'home',
      loginDialogOpen: false,
      createAccountDialogOpen: false,
      forgotPasswordDialogOpen: false,
      email: 'Jaqueline.Brakus@hotmail.com',
      password: 'NaYmtLbAXEdD8z8',
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
      await this.setUser({ email, password });
      loading.close();
      this.loginDialogOpen = false;
    },
  },
};
</script>

<style lang="scss">
.navbar {
  img {
    max-height: 40px;
  }
  .vs-navbar__group__items {
    left: -120px !important;
    border-radius: 18px 5px 18px 18px !important;
  }

  .vs-navbar__group__item {
    padding: 0 !important;
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
    color: #fff;
    &:hover {
      opacity: 1;
    }
  }
}

#dialog-1 {
  z-index: 1;
}

.dialog-2 {
  z-index: 2;
}
</style>
