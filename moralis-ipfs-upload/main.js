const serverUrl = "https://bfkd9d1hmmon.usemoralis.com:2053/server"; //Server url from moralis.io
const appId = "S0fAOQt9HO3wzyqyRPID4qtnr4UGSQkddJfymcLM"; // Application id from moralis.io
Moralis.start({ serverUrl, appId });

async function login() {
  try {
    user = await Moralis.authenticate();
    checkUser();
  } catch (error) {
    console.log(error);
  }
}

async function upload() {
  const fileInput = document.getElementById("file");
  const data = fileInput.files[0];
  const file = new Moralis.File("moralis.png", data);
  await file.saveIPFS();
  console.log(file.hash());
  console.log(file.ipfs());
}

document.getElementById("login_button").onclick = login;
document.getElementById("upload_file_button").onclick = upload;

const signInContainer = document.getElementById("sign_in_container");
const signedInContainer = document.getElementById("signed_in_container");

checkUser = async () => {
  if (await Moralis.User.current()) {
    signInContainer.style.display = "none";
    signedInContainer.style.display = "block";
  } else {
    signInContainer.style.display = "block";
    signedInContainer.style.display = "none";
  }
};

checkUser();
