import { onBeforeUnmount, onMounted } from "vue";
import { useRouter } from "vue-router";

export function useLeaveConfirm(
  message: string = "このページを離れると、変更が失われる可能性があります。"
) {
  const router = useRouter();

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = message;
  };

  onMounted(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  });

  router.beforeEach((to, from, next) => {
    if (confirm(message)) {
      next();
    } else {
      next(false);
    }
  });
}
