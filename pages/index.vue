<template>
  <calendar-view />
</template>

<script setup>
import { useConfirm } from "~/utils/confirm";
import { useRouter } from "#imports";

const router = useRouter();
useConfirm("このページを離れると、変更が失われる可能性があります。");
</script>
