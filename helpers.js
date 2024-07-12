function $(query) {
  return document.querySelectorAll(query);
}

function Validator(element) {
  let errorMsgEle = $(`#${element.id}Msg`)[0];
  let resetErrorMsg = element
    .getAttribute("custom-validation")
    .includes("isRequired:true")
    ? "*"
    : "";

  function setError(msg) {
    errorMsgEle.textContent = msg;
    element.style.border = "1px solid red";
    return false;
  }

  function resetField() {
    errorMsgEle.textContent = resetErrorMsg;
    element.style.border = "1px solid black";
    return true;
  }

  function isRequired() {
    if (element.value.trim() == "") {
      return setError("*Required");
    }
    return resetField();
  }

  function isPattern(pattern) {
    pattern = new RegExp(pattern, "g");
    if (!pattern.test(element.value)) {
      let errorMsg = element.getAttribute("error-message");
      return setError(errorMsg ?? "*Not valid");
    }
    return resetField();
  }

  function isMaxLength(value) {
    if (element.value.length > parseInt(value)) {
      return setError("*Max length - ${value} chars.");
    }
    return resetField();
  }

  function validateRadio(value) {
    let radioElements = value.split(",").map((item) => $(`#${item}`)[0]);
    if (!radioElements.some((element) => element.checked)) {
      errorMsgEle.textContent = `*Required`;
      return false;
    }
    errorMsgEle.textContent = "*";
    return true;
  }

  return {
    isRequired,
    isPattern,
    isMaxLength,
    validateRadio,
    // validateDoc
  };
}
