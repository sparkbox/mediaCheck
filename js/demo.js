import mediaCheck from './mediaCheck';

const demo = document.querySelector('.demo-area');

function smallScreen(mq) {
  if (mq.media)
  demo.innerText = 'This is a smaller screen.';
  demo.classList.toggle('green'); //'#19ae2b'
}

function largeScreen(mq) {
  if (document.body.offsetWidth >= 900) {
    // Note: Because this gets called by both mediaquery checks,
    // it needs to make sure that it actually needs to apply so
    // it doesn't overwrite the smallScreen message.

    demo.innerText = 'This is a larger screen.';
    demo.classList.toggle('orange'); //'#d3811e'
  }
}

function dude(mq) {
  demo.innerText = "Dude, that's a really big screen.";
  demo.classList.toggle('purple'); //'#6814d3'
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


// function switchExamples(e) {
//   var target = $(e.target),
//       $newExample = $(e.target.href.match(/.*\/(.*)/)[1]),
//       $all = $(".example, .exampleList-item");

//   e.preventDefault();
//   $all.removeClass("active");
//   $newExample.addClass("active");
//   $target.closest(".exampleList-item").addClass("active");
// }

// $('.exampleList-link').on("click", switchExamples);
