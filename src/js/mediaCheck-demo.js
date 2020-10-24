import mediaCheck from './mediaCheck';

const demo = document.querySelector('.demo-area');

function smallScreen(mq) {
  if (mq.media)
  demo.innerText = 'This is a smaller screen.';
  demo.classList.add('green');
  demo.classList.remove('blue', 'orange');
}

function largeScreen(mq) {
  debugger;
  if (document.body.offsetWidth >= 900) {
    // Note: Because this gets called by both mediaquery checks,
    // it needs to make sure that it actually needs to apply so
    // it doesn't overwrite the smallScreen message.

    demo.innerText = 'This is a larger screen.';
    demo.classList.add('orange');
    demo.classList.remove('blue', 'green');
    console.log(demo.classList);
  }
}

function dude(mq) {
  demo.innerText = "Dude, that's a really big screen.";
  demo.classList.add('blue');
  demo.classList.remove('orange', 'green');
}

mediaCheck({
  media: '(min-width: 900px)',
  entry: largeScreen,
  exit: smallScreen
});

mediaCheck({
  media: '(min-width: 1200px)',
  entry: dude,
  exit: largeScreen
});
