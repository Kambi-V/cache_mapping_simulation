<template>
  <div class="bg-blue-500 py-4">
    <div class="container mx-auto flex items-center justify-between">
      <div class="w-1/4"></div>
      <span class="w-1/4 text-center text-2xl text-blue-200"
        >Cache Mapping</span
      >
      <div class="flex w-3/4 justify-end gap-5">
        <NuxtLink to="/">
          <Button label="Direct" class="p-button-secondary border px-8 py-2" />
        </NuxtLink>
        <NuxtLink to="/associative">
          <Button
            label="Fully-associative"
            class="p-button-secondary border px-8 py-2"
          />
        </NuxtLink>
        <NuxtLink to="/setassociative">
          <Button
            label="Set-associative"
            class="p-button-secondary border px-8 py-2"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
