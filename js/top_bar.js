document.querySelector('#top_bar__language').addEventListener('click', toggleLanguageList, false)

function toggleLanguageList() {
  document.querySelector('#top_bar__language_list').classList
    .toggle('top_bar__language_list--active')
  document.querySelector('#top_bar__language_arrow').classList
    .toggle('top_bar__language_icon--arrow_down')
}