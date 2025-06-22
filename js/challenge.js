document.addEventListener('DOMContentLoaded', () => {
  let counter = document.getElementById('counter');
  let plusBtn = document.getElementById('plus');
  let minusBtn = document.getElementById('minus');
  let heartBtn = document.getElementById('heart');
  let pauseBtn = document.getElementById('pause');
  let commentForm = document.getElementById('comment-form');
  let commentList = document.getElementById('list');
  let likesUl = document.querySelector('.likes');

  let count = 0;
  let paused = false;
  let likeTracker = {};
  let timer = setInterval(incrementCounter, 1000);

  function incrementCounter() {
    counter.textContent = ++count;
  }

  function updateCounter(value) {
    count += value;
    counter.textContent = count;
  }

  plusBtn.addEventListener('click', () => updateCounter(1));
  minusBtn.addEventListener('click', () => updateCounter(-1));

  heartBtn.addEventListener('click', () => {
    if (!likeTracker[count]) {
      likeTracker[count] = 1;
      const li = document.createElement('li');
      li.dataset.num = count;
      li.textContent = `${count} has been liked 1 time`;
      likesUl.appendChild(li);
    } else {
      likeTracker[count]++;
      const li = document.querySelector(`li[data-num="${count}"]`);
      li.textContent = `${count} has been liked ${likeTracker[count]} times`;
    }
  });

  pauseBtn.addEventListener('click', () => {
    if (!paused) {
      clearInterval(timer);
      paused = true;
      pauseBtn.textContent = 'resume';
      plusBtn.disabled = true;
      minusBtn.disabled = true;
      heartBtn.disabled = true;
    } else {
      timer = setInterval(incrementCounter, 1000);
      paused = false;
      pauseBtn.textContent = 'pause';
      plusBtn.disabled = false;
      minusBtn.disabled = false;
      heartBtn.disabled = false;
    }
  });

  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const comment = e.target.elements['comment-input'].value;
    const p = document.createElement('p');
    p.textContent = comment;
    commentList.appendChild(p);
    e.target.reset();
  });
});
