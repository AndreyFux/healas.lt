import { userData } from "../forms/Autorizationforms.js"
import { updateUserWallet } from "../services/userService.js"
import * as constants from '../const.js';

export function animationCloseModal(modal) {
  document.body.style.overflow = "";
  const keyFrame = new KeyframeEffect(
    modal,
    [{ opacity: "1", opacity: "0" }],
    { duration: 300, easing: "ease", direction: "normal" }
  )

  const animation = new Animation(keyFrame, document.timeline)
  animation.play()
  animation.onfinish = () => modal.close()
}


function handleConfirmPlan(user, planPrice, modal) {
  user.wallet = user.wallet - planPrice
  updateUserWallet(user, modal);
}

function handleButtonDisabled(regButton, regCheckbox) {
  regButton.disabled = !regCheckbox.checked
  regCheckbox.onchange = function () {
    regButton.disabled = !this.checked
  }
}

function openBuyModalButton(trigger, modal) {
  const registrationModal = document.querySelector('.popup-register'),
    registrationTitle = registrationModal.querySelector('.popup__title');
  trigger.addEventListener('click', (e) => {
    if (userData.login === '') {
      if (e.target) {
        e.preventDefault();
      }
      registrationModal.showModal();
      document.body.style.overflow = "hidden";
      registrationTitle.innerHTML = 'For buy this Plan you may be registred';
      registrationTitle.classList.add('popup__warning');
    }
    else {
      const login = document.querySelector('.popup__login'),
        wallet_balance = document.querySelector('.popup__walletBalance'),
        plan = document.querySelector('.popup__plan'),
        price = document.querySelector('.popup__price');
      modal.showModal();
      document.body.classList.add("scroll-lock")
      e.preventDefault();
      login.innerHTML = `${userData.login}`;
      wallet_balance.innerHTML = `${userData.wallet}`

      for (let i = 0; i < constants.plans.length; i++) {
        if (e.target.id == constants.plans[i].name) {
          plan.innerHTML = `${constants.plans[i].name}`;
          price.innerHTML = `${constants.plans[i].price}` + '$';
          const confirmationButton = modal.querySelector('.button');
          confirmationButton.addEventListener('click', () => handleConfirmPlan(userData, constants.plans[i].price, modal))
        }
      }
    }
  });
}

function openAutorizationModalButton(trigger, modal, modalSelector) {
  const Checkbox = document.getElementById('personal-memory'),
    confirmationButton = modal.querySelector('.button');
  modalSelector == '.popup-register' && handleButtonDisabled(confirmationButton, Checkbox);
  trigger.addEventListener('click', (e) => {
    modalSelector == '.popup-register' && (modal.querySelector('.popup__title').innerHTML = "Registration")
    if (e.target) {
      e.preventDefault();
    }
    modal.showModal();
    document.body.style.overflow = "hidden";
  });
}

const modals = () => {
  function bindModal(triggerSelector, modalSelector) {
    const triggers = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      closeButton = modal.querySelector('.popup__close'),
      modalBox = modal.querySelector('.popup__body');

    triggers.forEach((trigger) => {
      triggerSelector === '.card__buyButton' ? openBuyModalButton(trigger, modal) : openAutorizationModalButton(trigger, modal, modalSelector);
    });


    closeButton.addEventListener('click', (e) => {
      animationCloseModal(modal);
    })

    modal.addEventListener('click', (e) => {
      if (!modalBox.contains(e.target)) {
        animationCloseModal(modal);
      }
    })
  }
  bindModal('.header__registerButton', '.popup-register');
  bindModal('.header__loginButton', '.popup-login');
  bindModal('.card__buyButton', '.popup-buy');
}

export default modals;