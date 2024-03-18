import Layout from "@/components/Layout/Layout";
import ViewCommonElements from "./ViewCommonElements";

export default function CancelClick() {
    const editDom = document.getElementById("editor");
    // const DOM = document.getElementById("contents");
    const accountDom = document.getElementById("account");
    const mailDom = document.getElementById("mail");
    const birthdayDom = document.getElementById("birthday");
    const maleDom = document.getElementById("male");
    const femaleDom = document.getElementById("female");
    const otherDom = document.getElementById("other");
    const naDom = document.getElementById("no_answer");

    accountDom.disabled = true;
    mailDom.disabled = true;
    birthdayDom.disabled = true;
    maleDom.disabled = true;
    femaleDom.disabled = true;
    otherDom.disabled = true;
    naDom.disabled = true;


    editDom.innerHTML = `
    <button type="button" onClick={EditClick} className="btn btn-outline-primary">Edit</button>
    `
    console.log(accountDom);
}