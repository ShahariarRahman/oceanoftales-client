import Swal from "sweetalert2";

// base
const base = Swal.mixin({
  cancelButtonColor: "#ff0000", // color
  confirmButtonColor: "#3870ff", // color
  confirmButtonText: "Confirm", // name default
  cancelButtonText: "Cancel", // name not default
  showCloseButton: true, // not default
  buttonsStyling: true,
});

// prompt base
const basePrompt = base.mixin({
  position: "center",
});

// toast base
const toastBase = base.mixin({
  toast: true,
  position: "top-right",
  timer: 5000,
  customClass: {
    // popup:
    //   "!flex whitespace-nowrap overflow-x-hidden items-center flex-row-reverse",
    // actions: "flex-row-reverse",
  },
});

const confirm = toastBase.mixin({
  position: "center",
  showCancelButton: true,
  timer: undefined,
  showCloseButton: false,
  icon: "question",
});

const confirmDelete = confirm.mixin({
  confirmButtonColor: "#ff0000",
  cancelButtonColor: "#3870ff",
  confirmButtonText: "Delete",
});

const notify = toastBase.mixin({
  showConfirmButton: false,
  icon: "info",
});

const warn = toastBase.mixin({
  showConfirmButton: false,
  icon: "warning",
});

const notifyAndAsk = toastBase.mixin({
  timer: 20000,
  confirmButtonText: "Yes",
  icon: "question",
});

const succeed = basePrompt.mixin({
  icon: "success",
  timer: 2500,
  showConfirmButton: false,
  showCloseButton: false,
});

const succeedAndAsk = basePrompt.mixin({
  confirmButtonText: "Visit",
  icon: "success",
});

const failed = basePrompt.mixin({
  icon: "error",
  showConfirmButton: false,
  footer: `<a href="">We're sorry. Get help via oceanoftails@gmail.com</a>`,
});

const failedAndAsk = basePrompt.mixin({
  confirmButtonText: "Try Again",
  icon: "error",
  footer: `<a href="">We're sorry. Get help via oceanoftails@gmail.com</a>`,
});

export const SwalToast = {
  confirm,
  confirmDelete,
  succeed,
  succeedAndAsk,
  notify,
  notifyAndAsk,
  warn,
  failed,
  failedAndAsk,
};
