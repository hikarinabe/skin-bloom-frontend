export function password_checker(password, password2) {
  if (password.length < 4) {
    return "パスワードは4文字以上を指定してください";
  }
  if (password != password2) {
    return "確認パスワードと一致しません";
  }
  return "";
}
