<template>
  <div class="bg-base-100 border-b fixed w-full">
    <div class="container max-w-7xl mx-auto navbar text-primary">
      <div class="navbar-start">
        <!-- Show Drop Down on Small Screen -->
        <DropDown />
        <NuxtLink to="/" class="btn btn-ghost normal-case text-xl">
          Top Twenty
        </NuxtLink>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li>
            <NuxtLink to="/">
              Home
            </NuxtLink>
            <NuxtLink to="/dashboard">
              Dashboard
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="navbar-end">
        <NuxtLink to="/auth" class="btn btn-primary">
          Get started
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
