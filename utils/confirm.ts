import { onBeforeUnmount, onMounted } from "vue";
import { useRouter } from "vue-router";

export function useConfirm(message: string) {
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
