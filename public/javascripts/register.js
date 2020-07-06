function checkboxCheck(checkbox) {
  let a = document.getElementById("allowAll");
  let b = document.getElementById("allowRequired");
  let c = document.getElementById("allowAdvertising");
  if (a.checked) {
    b.checked = true;
    c.checked = true;
  } else {
    b.checked = false;
    c.checked = false;
  }

  //   if (!b.checked || !c.checked) {
  //     a.checked = false;
  //   }
}
