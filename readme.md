#mediaCheck

This is a simple wrapper around matchMedia to run code on entry and exit from media queries. It also uses browser resize as a fallback for browsers that don't support matchMedia.


##Demo
There is a really basic example here: http://sparkbox.github.com/mediaCheck/


##Example:

```javascript
mediaCheck({
  media: '(max-width: 420px)',
  entry: function() {
    console.log('starting 420');
  },
  exit: function() {
    console.log('leaving 420');
  },
  both: function() {
    console.log('changing state');
  }
});
```