const uploadArea = document.querySelector(".upload-area")
const fileInput = document.querySelector("#file-upload")
const filePreview = document.querySelector('#file-preview')

const updatePreview = () => {
  const file = fileInput.files[0]
  if(!file) {
    return
  }else if (file.size > 500 * 1024) {
    uploadError.classList.add('upload-error')
    uploadError.textContent = 'Please upload a photo under 500KB.'
    fileInput.value = ''
  }else {
    filePreview.src = URL.createObjectURL(file)
  }
}

fileInput.addEventListener('change', updatePreview)

uploadArea.addEventListener("dragover", (e) => {
  e.preventDefault()
  uploadArea.classList.add('draggin')
})

uploadArea.addEventListener('dragleave', () => {
  uploadArea.classList.remove('draggin')
})

uploadArea.addEventListener("drop", (e) => {
  e.preventDefault()
  uploadArea.classList.remove('draggin')
  fileInput.files = e.dataTransfer.files
  updatePreview()
})

const infoData = document.querySelector('#info-data')
const form = document.querySelector('.form-section')
const fullName = document.querySelector('#name')
const email = document.querySelector('#email')
const userName = document.querySelector('#username')
const uploadError = document.querySelector('#upload-error')
const errorMessage = document.querySelector('.error-message')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const nameValue = fullName.value
  const emailValue = email.value
  const userNameValue = userName.value
  const avatar = fileInput.files[0]

  if(!avatar) {
    uploadError.classList.add('upload-error')
    uploadError.textContent = 'Please upload a photo first, max size: 500KB.'
  }else {
    uploadError.classList.remove('upload-error')
    uploadError.textContent = 'Upload your photo (JPG or PNG, max size: 500KB)'
  }

  if(!emailValue) {
    errorMessage.style.display = 'block'
  }else {
    errorMessage.style.display = 'none'
  }

  if (avatar && nameValue && emailValue && userNameValue) {

    const avatarURL = URL.createObjectURL(avatar)
    
    infoData.innerHTML = `
    <h1 class="title">Congrats, <span>${nameValue}</span>! Your ticket is ready.</h1>
    <p class="subtitle">We've emailed your ticket to <span>${emailValue}</span> and will send updates in the run up to the event.</p>

    <section class="generated-ticket">
      <img src="images/pattern-ticket.svg" alt="">

      <article class="ticket-data">
        <div>
          <img src="images/logo-mark.svg" alt="" class="logo">
          <div>
            <h2>Coding Conf</h2>
            <p>Jan 31, 2026 / Austin, TX</p>
          </div>
        </div>

        <div>
          <img src="${avatarURL}" alt="" class="avatar">
          <div>
            <h3>${nameValue}</h3>
            <p><img src="images/icon-github.svg" alt="">@${userNameValue}</p>
          </div>
        </div>

        <p class="serie">#01609</p>
      </article>
    </section>
    `
  }
})