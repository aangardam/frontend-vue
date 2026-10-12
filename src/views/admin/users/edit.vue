<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import SidebarMenu from "../../../components/SidebarMenu.vue";
import { reactive, ref, watchEffect } from "vue";
import { useUserUpdate } from "../../../composables/user/useUserUpdate";
import { useUserById } from "../../../composables/user/useUserById.ts";

const route = useRoute();
const router = useRouter();

const id = Number(route.params.id);
const name = ref<string>("");
const username = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");

const errors = reactive<Record<string, string>>({});

const { data: user } = useUserById(id);

watchEffect(() => {
  if (user.value) {
    name.value = user.value.name;
    email.value = user.value.email;
    username.value = user.value.username;
  }
});

const { mutate, isPending } = useUserUpdate();

const updateUser = (e: Event) => {
  e.preventDefault();

  mutate(
    {
      id,
      data: {
        name: name.value,
        username: username.value,
        email: email.value,
        password: password.value,
      },
    },
    {
      onSuccess: () => {
        router.push("/admin/users");
      },
      onError: (error: any) => {
        Object.assign(errors, error.response.data.errors);
      },
    },
  );
};
</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-md-3">
        <SidebarMenu />
      </div>
      <div class="col-md-9">
        <div class="card border-0 rounded-4 shadow-sm">
          <div class="card-header">ADD USER</div>
          <div class="card-body">
            <form @submit="updateUser">
              <div class="form-group mb-3">
                <label class="mb-1 fw-bold">Full Name</label>
                <input
                  type="text"
                  v-model="name"
                  class="form-control"
                  placeholder="Full Name"
                />
                <div
                  v-if="errors.Name"
                  class="alert alert-danger mt-2 rounded-4"
                >
                  {{ errors.Name }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label class="mb-1 fw-bold">Username</label>
                <input
                  type="text"
                  v-model="username"
                  class="form-control"
                  placeholder="Username"
                />
                <div
                  v-if="errors.Username"
                  class="alert alert-danger mt-2 rounded-4"
                >
                  {{ errors.Username }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label class="mb-1 fw-bold">Email address</label>
                <input
                  type="email"
                  v-model="email"
                  class="form-control"
                  placeholder="Email Address"
                />
                <div
                  v-if="errors.Email"
                  class="alert alert-danger mt-2 rounded-4"
                >
                  {{ errors.Email }}
                </div>
              </div>

              <div class="form-group mb-3">
                <label class="mb-1 fw-bold">Password</label>
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                  placeholder="Password"
                />
                <div
                  v-if="errors.Password"
                  class="alert alert-danger mt-2 rounded-4"
                >
                  {{ errors.Password }}
                </div>
              </div>
              <div class="d-flex justify-content-start gap-2">
                <button
                  type="submit"
                  class="btn btn-primary rounded-4 shadow-sm border-0"
                  :disabled="isPending"
                >
                  {{ isPending ? "Loading..." : "Update" }}
                </button>
                <router-link
                  class="btn btn-danger rounded-4 shadow-sm border-0"
                  to="/admin/users"
                >
                  Cancel
                </router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
