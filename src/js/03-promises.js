const refs = {
  form: document.querySelector(".form"),
}

let delay = "";
let step = "";
let amount = "";

refs.form.addEventListener("submit", onFormSabmit);

function onFormSabmit(event) {
  event.preventDefault();
 
  step = event.target.step.value;
  amount = event.target.amount.value;
  delay = event.target.delay.value;

  for (let i = 1; i <= amount; i += 1) {
    createPromise([i], delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay = Number(delay) + Number(step);
  } 
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve( {position, delay} );
      } else {
        reject( {position, delay} );
      }
    }, delay);
  });
}