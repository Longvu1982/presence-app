import useAuthStore from "@/store/auth.store";

export const useTriggerLoading = () => {
  const removeToken = useAuthStore((state) => state.removeToken);

  const triggerLoading = async <T>(callback: () => Promise<T> | T, key?: string, setLoading?: (isLoading: boolean) => void) => {
    // const { createUUId } = useUtils();
    // const loadingKey = key ?? createUUId();

    try {
      setLoading?.(true);
      return await callback();
    } catch (e: A) {
      console.log(e);
      // handleError(e);
      if (e?.status === 405) {
        // removeToken();
      }
    } finally {
      setLoading?.(false);
    }
  };

  return { triggerLoading };
};
