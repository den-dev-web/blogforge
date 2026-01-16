import { getUiLabel, getLang } from "./i18n.js";

const initForms = () => {
  const subscribeForm = document.querySelector("[data-subscribe]");
  const subscribeStatus = document.querySelector("[data-subscribe-status]");

  if (subscribeForm && subscribeStatus) {
    subscribeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      subscribeStatus.textContent = getUiLabel("subscribeSuccess", getLang());
      subscribeForm.reset();
    });
  }

  const commentForm = document.querySelector("[data-comment-form]");
  const commentStatus = document.querySelector("[data-comment-status]");

  if (commentForm && commentStatus) {
    commentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      commentStatus.textContent = getUiLabel("commentSuccess", getLang());
      commentForm.reset();
    });
  }

  const authSection = document.querySelector("[data-auth]");

  if (authSection) {
    const panels = Array.from(
      authSection.querySelectorAll("[data-auth-panel]")
    );
    const switches = Array.from(
      authSection.querySelectorAll("[data-auth-switch]")
    );
    const authForms = Array.from(
      authSection.querySelectorAll("[data-auth-form]")
    );

    const setStatus = (form, message, type) => {
      const status = form.querySelector("[data-auth-status]");
      if (!status) {
        return;
      }
      status.textContent = message;
      status.classList.remove("auth-status--error", "auth-status--success");
      if (type) {
        status.classList.add(`auth-status--${type}`);
      }
    };

    const setFieldError = (field, message) => {
      if (!field) {
        return;
      }
      const error = field.querySelector("[data-field-error]");
      if (!error) {
        return;
      }
      field.classList.toggle("form-field--error", Boolean(message));
      error.textContent = message || "";
      error.hidden = !message;
    };

    const clearFormState = (form) => {
      const fields = Array.from(form.querySelectorAll(".form-field"));
      fields.forEach((field) => setFieldError(field, ""));
      setStatus(form, "", null);
      delete form.dataset.showErrors;
    };

    const validateInput = (input, form, showRequired) => {
      const value = input.value.trim();
      if (input.type === "checkbox") {
        if (!input.required) {
          return "";
        }
        if (!input.checked) {
          if (!showRequired) {
            return "";
          }
          return "Потрібно підтвердити умови.";
        }
        return "";
      }
      if (!value) {
        if (!input.required) {
          return "";
        }
        if (!showRequired) {
          return "";
        }
        return "Поле є обов'язковим.";
      }
      if (input.type === "email" && !input.validity.valid) {
        return "Некоректний email.";
      }
      if (input.name === "password" && value.length < 8) {
        return "Пароль має містити щонайменше 8 символів.";
      }
      if (input.dataset.compare) {
        const match = form.querySelector(
          `[name="${input.dataset.compare}"]`
        );
        if (match && value !== match.value.trim()) {
          return "Паролі не збігаються.";
        }
      }
      return "";
    };

    const showPanel = (panelName) => {
      authForms.forEach((form) => clearFormState(form));
      panels.forEach((panel) => {
        const isActive = panel.dataset.authPanel === panelName;
        panel.hidden = !isActive;
      });
      const activePanel = authSection.querySelector(
        `[data-auth-panel="${panelName}"]`
      );
      if (activePanel) {
        const firstInput = activePanel.querySelector("input");
        if (firstInput) {
          firstInput.focus();
        }
      }
    };

    switches.forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.dataset.authSwitch;
        if (target) {
          showPanel(target);
        }
      });
    });

    authForms.forEach((form) => {
      const inputs = Array.from(form.querySelectorAll("input"));
      inputs.forEach((input) => {
        input.addEventListener("blur", () => {
          const field = input.closest(".form-field");
          const showRequired = form.dataset.showErrors === "true";
          setFieldError(field, validateInput(input, form, showRequired));
        });
        input.addEventListener("input", () => {
          const field = input.closest(".form-field");
          if (field && field.classList.contains("form-field--error")) {
            const showRequired = form.dataset.showErrors === "true";
            setFieldError(field, validateInput(input, form, showRequired));
          }
        });
      });

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        form.dataset.showErrors = "true";
        let firstInvalid = null;
        inputs.forEach((input) => {
          const field = input.closest(".form-field");
          const message = validateInput(input, form, true);
          setFieldError(field, message);
          if (message && !firstInvalid) {
            firstInvalid = input;
          }
        });

        if (firstInvalid) {
          setStatus(form, "Перевірте форму та виправте помилки.", "error");
          firstInvalid.focus();
          return;
        }

        setStatus(form, "Дані перевірено. Можна надсилати.", "success");
      });
    });

    showPanel("login");
  }
};

export default initForms;
