/**
 * @param  {string} inputId - input id
 * @param  {(string)=>boolean} validation - validate function that returns true if valid.
 * @param  {(boolean)=>string} label - a function returns label text
 */
function applyValidation(inputId, validation, label) {
  const inputDom = document.getElementById(inputId);
  const labelDom = document.getElementById(inputId + "_label");
  inputDom.addEventListener("focusout", (e) => {
    labelDom.innerText = label(validation(e.target.value));
  });
}
