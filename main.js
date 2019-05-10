import "regenerator-runtime/runtime";
import ClipboardJS from "clipboard";

const submitButton = document.querySelector(".button-large");
const outputArea = document.getElementById("outputCss");
const form = document.getElementById("uncss-form");
const inputHtml = document.getElementById("inputHtml");
const inputCss = document.getElementById("inputCss");
const formAction = "/api/uncss/";
const formMethod = "POST";

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

const parseJSON = (response) => {
  return response.json();
};

const checkCSS = (data) => {
  if (!data.error) {
    return data;
  } else {
    const error = new Error(data.error.name);
    error.name = data.error.name;
    error.message = data.error.reason + "; Line:" + (data.error.line - 1) + "; Column:" + data.error.column;
    throw error;
  }
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  submitButton.classList.add("button-loading");

  const sendData = {
    inputHtml: inputHtml.value,
    inputCss: inputCss.value
  };

  try {
    const response = await fetch(formAction, {
      method: formMethod,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendData)
    });
    const data = await checkStatus(response);
    const jsonData = await parseJSON(data);
    const cssData = await checkCSS(jsonData);

    submitButton.classList.remove("button-loading");
    outputArea.innerHTML = cssData.outputCss;
    document.querySelector(".error").style.display = "none";
  } catch (error) {
    submitButton.classList.remove("button-loading");
    document.querySelector(".error-name").innerHTML = error.name;
    document.querySelector(".error-message").innerHTML = error.message;
    document.querySelector(".error").style.display = "block";
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
