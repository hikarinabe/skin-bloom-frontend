import CancelClick from "./CancelClick";

export default function EditClick() {
  const editDom = document.getElementById("editor");
  // const DOM = document.getElementById("contents");
  const accountDom = document.getElementById("account");
  const mailDom = document.getElementById("mail");
  const birthdayDom = document.getElementById("birthday");
  const maleDom = document.getElementById("male");
  const femaleDom = document.getElementById("female");
  const otherDom = document.getElementById("other");
  const naDom = document.getElementById("no_answer");

  accountDom.disabled = false;
  mailDom.disabled = false;
  birthdayDom.disabled = false;
  maleDom.disabled = false;
  femaleDom.disabled = false;
  otherDom.disabled = false;
  naDom.disabled = false;

  editDom.innerHTML = `
    <button onclick={CancelClick} class="btn btn-outline-primary">Cancel</button>
    <button onClick={SaveClick} class="btn btn-primary">Save</button>
    `;
  console.log(accountDom);
  return editDom;
}
