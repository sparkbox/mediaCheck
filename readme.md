
```
                      _ _        ____ _               _
   _ __ ___   ___  __| (_) __ _ / ___| |__   ___  ___| | __
  | '_ ` _ \ / _ \/ _` | |/ _` | |   | '_ \ / _ \/ __| |/ /
  | | | | | |  __/ (_| | | (_| | |___| | | |  __/ (__|   <
  |_| |_| |_|\___|\__,_|_|\__,_|\____|_| |_|\___|\___|_|\_\
```

This is a simple wrapper around matchMedia to run code on entry and exit from media queries. It also uses browser resize as a fallback for browsers that don't support matchMedia.


## Demo
There are two examples here: http://sparkbox.github.io/mediaCheck/


#### media
Type: `string`

This is the mediaquery that will trigger the specified action. It should be in the form:

 * `(min-width: 420px)`
 * `(min-width: 35em)`
 * `(max-width: 800px)`
 * `(max-width: 60em)`

#### entry
Type: `function`

This function will execute once when the mediaquery becomes **active**.

#### exit
Type: `function`

This function will execute once when the mediaquery becomes **inactive**.

#### both
Type: `function`

This function will execute once when the mediaquery **changes** state.


## Usage Example:

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

## Change History
 - 0.4.5
   - Passing `mq` to `entry`, `exit`, and `both`
