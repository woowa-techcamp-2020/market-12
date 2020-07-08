import { getUsers } from "./register";

function test() {
  document.getElementById("input_id").value = "testId";
  document.getElementById("input_password").value = "testpw";
  document.getElementById("input_password_check").value = "testpw";
  document.getElementById("input_email_username").value = "test";
  document.getElementById("input_email_provider").value = "woowahan.com";
  document.getElementById("input_name").value = "우아한";
  document.getElementById("input_phone").value = "01012345678";
  document.getElementById("phone_check").value = "123456";
  document.getElementById("address").value = "경기도 성남시 분당구";
  document.getElementById("allowAll").checked = "true";
  document.getElementById("agreeEssential").checked = "true";
  document.getElementById("agreeAdvertisement").checked = "true";

  getUsers.getUsers();
}
