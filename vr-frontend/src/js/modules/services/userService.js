import { userAutorization, changeStatusLoading } from "../forms/Autorizationforms.js";
import * as constants from '../const.js';
import { animationCloseModal } from "../modals/modals.js";

export async function sendUserData(data, modal, title) {
    data.wallet = 999;
    return await fetch('http://localhost:3002/vr_proj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети или сервера');
            }
            return response.json();
        })
        .then(data => {
            userAutorization(modal, data, title);
        })
        .catch(error => {
            console.error(error);
            changeStatusLoading(constants.message.failure);
        })
        .finally(() => {
            setTimeout(() => {
                document.querySelector(".status").remove();
            }, 4000)
        })
}

export async function checkUser(data, modal, title) {
    fetch(`http://localhost:3002/vr_proj/${data.login}/${data.password}`, {
        method: 'GET',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети или сервера');
            }
            return response.json();
        })
        .then(data => userAutorization(modal, data, title)
        )
        .catch(error => {
            console.error(error);
        });
}

export async function updateUserWallet(data, modal) {
    return await fetch(`http://localhost:3002/vr_proj/${data.login}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети или сервера');
            }
            return response.json();
        })
        .then(data => {
            animationCloseModal(modal)
        })
        .catch(error => {
            console.error(error);
        });
}