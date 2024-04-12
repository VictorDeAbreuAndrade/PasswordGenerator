let = passwordLength = 16
const inputElement = document.querySelector('#password')
const upperCaseCheckElement = document.querySelector('#uppercase-check')
const numberCheckElement = document.querySelector('#number-check')
const symbolCheckElement = document.querySelector('#symbol-check')
const securityIndicatorBarElement = document.querySelector('#security-indicator-bar')

function generatePassword() {
    let chars = 'abcdefghijklmnopqrstuvwxyz'
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numberChars = '0123456789'
    const symbolChars = '?!@#%&*()[]'

    if (upperCaseCheckElement.checked) {
        chars += upperCaseChars
    }
    if (numberCheckElement.checked) {
        chars += numberChars
    }
    if (symbolCheckElement.checked) {
        chars += symbolChars
    }



    let password = ''

    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)

        password += chars[randomNumber]
    }

    inputElement.value = password

    calculateQuality()
    calculateFontSize()
}

function calculateQuality() {

    // Quality formula:
    // passwordLength * 40 + hasUpperCase * 10 + hasNumbers * 15 + hasSymbols * 35 = 100

    const percent = Math.round(
        (passwordLength / 64) * 40 +
        (upperCaseCheckElement.checked ? 10 : 0) +
        (numberCheckElement.checked ? 15 : 0) +
        (symbolCheckElement.checked ? 35 : 0)
    )

    console.log(percent)

    securityIndicatorBarElement.style.width = `${percent}%`

        if (percent > 69) {

            securityIndicatorBarElement.classList.remove('critical')
            securityIndicatorBarElement.classList.remove('warning')
            securityIndicatorBarElement.classList.add('safe')

        } else if (percent > 50) {

            securityIndicatorBarElement.classList.remove('critical')
            securityIndicatorBarElement.classList.remove('safe')
            securityIndicatorBarElement.classList.add('warning')

        } else {

            securityIndicatorBarElement.classList.remove('warning')
            securityIndicatorBarElement.classList.remove('safe')
            securityIndicatorBarElement.classList.add('critical')
            
        }
        
        if (percent >= 100) {
            securityIndicatorBarElement.classList.add('completed')
        } else {
            securityIndicatorBarElement.classList.remove('completed')
        }

}

function calculateFontSize() {
    if (passwordLength > 45) {
        inputElement.classList.remove('font-sm')
        inputElement.classList.remove('font-xs')
        inputElement.classList.add('font-xxs')
    } else if (passwordLength > 32) {
        inputElement.classList.remove('font-sm')
        inputElement.classList.remove('font-xxs')
        inputElement.classList.add('font-xs')
    } else if (passwordLength > 22) {
        inputElement.classList.remove('font-xs')
        inputElement.classList.remove('font-xxs')
        inputElement.classList.add('font-sm')
    } else {
        inputElement.classList.remove('font-sm')
        inputElement.classList.remove('font-xs')
        inputElement.classList.remove('font-xxs')
    }
}

function copy() {
    navigator.clipboard.writeText(inputElement.value)
}

const passwordLengthElement = document.querySelector('#passwordLength')
passwordLengthElement.addEventListener('input', function() {
    passwordLength = passwordLengthElement.value
    document.querySelector('#password-length-text').innerText = passwordLength
    generatePassword()
})

upperCaseCheckElement.addEventListener('click', generatePassword)
numberCheckElement.addEventListener('click', generatePassword)
symbolCheckElement.addEventListener('click', generatePassword)

document.querySelector('#copy-1').addEventListener('click', copy)
document.querySelector('#copy-2').addEventListener('click', copy)
document.querySelector('#renew').addEventListener('click', generatePassword)

generatePassword()