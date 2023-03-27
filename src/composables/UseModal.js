import { ref } from "vue";

export function useModal() {
  const isOpenModal = ref(false);

  const closeModal = () => {
    isOpenModal.value = false;
  };
  const openModal = () => {
    isOpenModal.value = true;
  };

  return { isOpenModal, closeModal, openModal };
}
