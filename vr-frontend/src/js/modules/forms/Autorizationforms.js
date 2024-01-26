import * as constants from '../const.js';
import { sendUserData, checkUser } from '../services/userService.js';
import { animationCloseModal } from "../modals/modals.js";


export const userData = {
    login: '',
    password: '',
    email: "",
    wallet: ''
};

function logoutUser(buttons, userInfo) {
    userData.login = '';
    userData.password = '';
    userData.email = '';
    buttons.classList.remove("hidden");
    userInfo.classList.add("hidden");
}

function openLoginInformation(data) {
    const buttons = document.querySelector('.header__autorizationButtons'),
        userInfo = document.querySelector('.header__userInfo'),
        userLogin = document.querySelector('.header__userLogin');
    const logoutButton = userInfo.querySelector('.button');
    buttons.classList.add("hidden");
    userInfo.classList.remove("hidden");
    logoutButton.addEventListener('click', () => logoutUser(buttons, userInfo));
    userLogin.innerHTML = `${data.login}`;
}

export function userAutorization(modal, data, title) {
    if (data != null) {
        openLoginInformation(data);
        animationCloseModal(modal);
        userData.login = data.login;
        userData.password = data.password;
        userData.email = data.email;
        userData.wallet = data.wallet;
    }
    else {
        const textTitle = title.innerHTML;
        title.style.cssText = 'font-size: 24px';
        textTitle == 'Login Form' ? title.innerHTML = constants.message.notRegistred : title.innerHTML = constants.message.alreadyTaken;
        setTimeout(() => {
            title.style.cssText = '';
            title.innerHTML = textTitle;
        }, 4000)
    }
}

export const changeStatusLoading = (message) => {
    document.querySelector(".status").textContent = message;
}

const AutorizationForms = () => {
    function bindForm(modalSelector, sendRequest) {
        const modal = document.querySelector(modalSelector),
            form = modal.querySelector(".autorization"),
            inputs = document.querySelectorAll(".input"),
            title = modal.querySelector('.popup__title');

        const clearInputs = () => {
            inputs.forEach((item) => {
                item.value = '';
            })
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            let statusMessage = document.createElement('div');
            statusMessage.classList.add("status");
            form.appendChild(statusMessage);
            const data = new FormData(e.target);
            const response = await sendRequest(Object.fromEntries(data), modal, title)
            clearInputs();
        })
    }
    bindForm('.popup-register', sendUserData)
    bindForm('.popup-login', checkUser)
}

export default AutorizationForms;