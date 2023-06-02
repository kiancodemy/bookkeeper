const showmodal = document.getElementById("show-modal");
const container = document.querySelector(".modal-container");
const modal = document.getElementById("modal");
const clos = document.getElementById("close-modal");
const bookmarkfrom = document.getElementById("bookmark-form");
const webbsitename = document.getElementById("website-name");
const bookmarkurl = document.getElementById("website-Url");
const bookmarkcontainer = document.getElementById("bookmarks-container");
let marks = [];
const show = function () {
  modal.classList.add("show-modal");
};
const delet = function () {
  modal.classList.remove("show-modal");
};
showmodal.addEventListener("click", show);
clos.addEventListener("click", delet);
const a = function (e) {
  if (e.target === modal) {
    modal.classList.remove("show-modal");
  }
};

function build() {
  bookmarkcontainer.textContent = ``;
  marks.forEach((marks) => {
    const { name, urlvalue } = marks;

    const item = document.createElement("div");
    item.classList.add("item");

    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-times");
    closeIcon.setAttribute("title", "Delete Bookmark");
    closeIcon.setAttribute("onclick", `deleteBookmark('${urlvalue}')`);

    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");

    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${urlvalue}`
    );
    favicon.setAttribute("alt", "Favicon");

    const link = document.createElement("a");
    link.setAttribute("href", `${urlvalue}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;

    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarkcontainer.appendChild(item);
  });
}

function validate(value, url) {
  const expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!value || !url) {
    alert("please fill both fields");
    return false;
  }

  if (!url.match(regex)) {
    alert("not match");
    return false;
  }
  return true;
}

/*fetch*/
const fetch = function () {
  if (localStorage.getItem("bookmark")) {
    marks = JSON.parse(localStorage.getItem("bookmark"));
  } else {
    marks = [{ name: "kian", urlvalue: "https://google.com" }];
    localStorage.setItem("bookmark", JSON.stringify(marks));
  }
  build();
};

const storebookmark = function (e) {
  e.preventDefault();
  const value = webbsitename.value;
  let url = bookmarkurl.value;
  if (!bookmarkurl.value.includes(`http://` || `https://`)) {
    url = `https://${url}`;
  }
  console.log(value, url);

  if (!validate(value, url)) {
    return false;
  }
  const bookmark = { name: value, urlvalue: url };
  console.log(bookmark);
  marks.push(bookmark);
  console.log(marks);
  localStorage.setItem("bookmark", JSON.stringify(marks));
  fetch();

  bookmarkfrom.reset();
};
window.addEventListener("click", a);
bookmarkfrom.addEventListener("submit", storebookmark);
fetch();

function deleteBookmark(url) {
  marks.forEach((a, b) => {
    if (a.urlvalue === url) {
      marks.splice(b, 1);
    }
    localStorage.setItem("bookmark", JSON.stringify(marks));
    fetch();
  });
}
