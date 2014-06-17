window.mediaCheck = (options) ->
  mq = undefined
  mqChange = undefined
  createListener = undefined
  convertEmToPx = undefined
  getPXValue = undefined
  hasMatchMedia = window.matchMedia isnt `undefined` and !!window.matchMedia("!").addListener

  if hasMatchMedia
    mqChange = (mq, options) ->
      if mq.matches
        options.entry()  if typeof options.entry is "function"
      else options.exit()  if typeof options.exit is "function"
      options.both()  if typeof options.both is "function"


    # Has matchMedia support
    createListener = ->
      mq = window.matchMedia(options.media)
      mq.addListener ->
        mqChange mq, options

      window.addEventListener "orientationchange", (->
        mq = window.matchMedia(options.media)
        mqChange mq, options
      ), false
      mqChange mq, options

    createListener()
  else
    breakpoints = {}

    mqChange = (mq, options) ->
      if mq.matches
        options.entry() if typeof options.entry is "function" and (breakpoints[options.media] is false or not breakpoints[options.media]?)
      else
        options.exit() if typeof options.exit is "function" and (breakpoints[options.media] is true or not breakpoints[options.media]?)

      options.both()  if typeof options.both is "function"
      breakpoints[options.media] = mq.matches

    convertEmToPx = (value) ->
      emElement = undefined
      emElement = document.createElement("div")
      emElement.style.width = "1em"
      emElement.style.position = "absolute"
      document.body.appendChild emElement
      px = value * emElement.offsetWidth
      document.body.removeChild(emElement)

      px

    getPXValue = (width, unit) ->
      value = undefined
      switch unit
        when "em"
          value = convertEmToPx(width)
        else
          value = width
      value

    # Create list of breakpoints
    for i of options
      breakpoints[options.media] = null

    # No matchMedia support
    mmListener = ->
      parts = options.media.match(/\((.*)-.*:\s*([\d\.]*)(.*)\)/)
      constraint = parts[1]
      value = getPXValue(parseInt(parts[2], 10), parts[3])
      fakeMatchMedia = {}
      windowWidth = window.innerWidth || document.documentElement.clientWidth

      fakeMatchMedia.matches = constraint is "max" and value > windowWidth or constraint is "min" and value < windowWidth

      mqChange fakeMatchMedia, options


    if window.addEventListener
      window.addEventListener "resize", mmListener
    else
      if window.attachEvent
        window.attachEvent "onresize", mmListener

    mmListener()
