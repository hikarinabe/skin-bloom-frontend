import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import ViewCommonElements from "./profile/ViewCommonElements";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./Profile.module.scss";
// import EditClick from "./profile/EditClick";
// import SaveClick from "./profile/SaveClick";
// import CancelClick from "./profile/CancelClick";

export default function Profile() {

    return (
        <Layout>
            <ViewCommonElements />
            <main>
                <div className={styles.Button}>
                    <div className="form-check form-check-reverse" id="editor">
                        <Link href="./edit" class="btn btn-outline-primary">Edit</Link>
                        {/* <button type="button" onClick={EditClick} className="btn btn-outline-primary">Edit</button> */}
                    </div>
                </div>
                <div className={styles.contents}>
                    <div className="w-75" id="contents">
                        <div>
                            <label>アカウント名</label>
                            <div className="input-group">
                                <span className="input-group-text"><img src="/icons/file-earmark-person.svg"></img></span>
                                <input id="account" className="form-control bg-white" placeholder="account_name" disabled />
                            </div>
                        </div>
                        <div>
                            <label>現在のメールアドレス</label>
                            <div className="input-group">
                                <span className="input-group-text"><img src="/icons/envelope.svg"></img></span>
                                <input id="mail" placeholder="@gmail.com" className="form-control bg-white" disabled />
                            </div>
                        </div>
                        <div>
                            <label>誕生日</label>
                            <div className="input-group">
                                <span className="input-group-text"><img src="/icons/calendar-event.svg"></img></span>
                                <input id="birthday" className="form-control bg-white" placeholder="2022年02月03日" disabled />
                            </div>
                        </div>
                        <div id="radio">
                            <p>性別</p>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="male" disabled />
                                <label className="form-check-label" htmlFor="male">
                                    男性
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="female" disabled />
                                <label className="form-check-label" htmlFor="female">
                                    女性
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="other" disabled />
                                <label className="form-check-label" htmlFor="other">
                                    その他
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="no_answer" checked disabled />
                                <label className="form-check-label text-dark" htmlFor="no_answer">
                                    回答しない
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}

// function EditClick(){
//     const editDom = document.getElementById("editor");
//     // const DOM = document.getElementById("contents");
//     const accountDom = document.getElementById("account");
//     const mailDom = document.getElementById("mail");
//     const birthdayDom = document.getElementById("birthday");
//     const maleDom = document.getElementById("male");
//     const femaleDom = document.getElementById("female");
//     const otherDom = document.getElementById("other");
//     const naDom = document.getElementById("no_answer");

//     accountDom.disabled = false;
//     mailDom.disabled = false;
//     birthdayDom.disabled = false;
//     maleDom.disabled = false;
//     femaleDom.disabled = false;
//     otherDom.disabled = false;
//     naDom.disabled = false;


//     editDom.innerHTML = `
//     <button onclick={CancelClick} class="btn btn-outline-primary">Cancel</button>
//     <button onClick={SaveClick} class="btn btn-primary">Save</button>
//     `

// }

// function CancelClick(){
//     const editDom = document.getElementById("editor");
//     // const DOM = document.getElementById("contents");
//     const accountDom = document.getElementById("account");
//     const mailDom = document.getElementById("mail");
//     const birthdayDom = document.getElementById("birthday");
//     const maleDom = document.getElementById("male");
//     const femaleDom = document.getElementById("female");
//     const otherDom = document.getElementById("other");
//     const naDom = document.getElementById("no_answer");

//     accountDom.disabled = true;
//     mailDom.disabled = true;
//     birthdayDom.disabled = true;
//     maleDom.disabled = true;
//     femaleDom.disabled = true;
//     otherDom.disabled = true;
//     naDom.disabled = true;


//     editDom.innerHTML = `
//     <button type="button" onClick={EditClick} className="btn btn-outline-primary">Edit</button>
//     `
//     console.log(accountDom);
// }

// function SaveClick(){
//     const editDom = document.getElementById("editor");
//     // const DOM = document.getElementById("contents");
//     const accountDom = document.getElementById("account");
//     const mailDom = document.getElementById("mail");
//     const birthdayDom = document.getElementById("birthday");
//     const maleDom = document.getElementById("male");
//     const femaleDom = document.getElementById("female");
//     const otherDom = document.getElementById("other");
//     const naDom = document.getElementById("no_answer");

//     console.log(accountDom);
//     console.log(mailDom);
//     console.log(birthdayDom);
//     console.log(maleDom);
//     console.log(femaleDom);
//     console.log(otherDom);
//     console.log(naDom);

// }