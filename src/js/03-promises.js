import Notiflix from 'notiflix';

const formEl = document.querySelector(".form");

formEl.addEventListener("submit", onSubmitClick);

function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay })
        } else {
          reject({ position, delay })
        }
      }, delay);
    })
  }

function onSubmitClick(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.currentTarget;
  let delayPromise = Number(delay.value);
  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, delayPromise)
      .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      })
    delayPromise += Number(step.value);
  }
}
  
// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
