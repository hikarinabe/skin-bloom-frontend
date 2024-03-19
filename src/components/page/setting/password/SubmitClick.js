export default function SubmitClick() {
  const current_password = document.getElementById("current_password");
  const new_password = document.getElementById("new_password");
  const confirm_password = document.getElementById("confirm_password");

  console.log(current_password.value);
  console.log(new_password.value);
  console.log(confirm_password.value);

  alert("登録しました");
}
