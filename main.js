import "regenerator-runtime/runtime";
import ClipboardJS from "clipboard";
import axios from "axios";

const submitButton = document.getElementById("submitButton");
const outputArea = document.getElementById("outputCss");
const form = document.getElementById("uncss-form");
const inputHtml = document.getElementById("inputHtml");
const inputCss = document.getElementById("inputCss");
const apiUrl = "/api/uncss/";

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  submitButton.classList.add("button-loading");
  submitButton.setAttribute("disabled", true);

  const data = {
    inputHtml: inputHtml.value,
    inputCss: inputCss.value
  };

  try {
    if (!data.inputHtml) throw new Error('Cannot process empty HTML');
    if (!data.inputCss) throw new Error('Cannot process empty CSS');

    const response = await axios.post(apiUrl, data);

    outputArea.value = response.data.outputCss;
    document.querySelector(".error").setAttribute("hidden", true);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      document.querySelector(".error-name").innerText = error.response.data.error.name;
      document.querySelector(".error-message").innerText = error.response.data.error.message;
    } else {
      document.querySelector(".error-name").innerText = error.name;
      document.querySelector(".error-message").innerText = error.message;
    }
    document.querySelector(".error").removeAttribute("hidden");
  } finally {
    submitButton.classList.remove("button-loading");
    submitButton.removeAttribute("disabled");
  }
}, false);

const clipboard = new ClipboardJS(".js-clipboard");

clipboard.on("success", () => {
  document.getElementById("js-clipboard-message").textContent = "Copied to your clipboard";
  document.getElementById("js-clipboard-message").removeAttribute("hidden");
});
clipboard.on("error", () => {
  document.getElementById("js-clipboard-message").textContent = "Press Command+C to copy";
  document.getElementById("js-clipboard-message").removeAttribute("hidden");
});
