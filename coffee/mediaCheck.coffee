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
        options.entry(mq) if typeof options.entry is "function"
      else
        options.exit(mq) if typeof options.exit is "function"
      options.both(mq) if typeof options.both is "function"


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
        options.entry(mq) if typeof options.entry is "function" and (breakpoints[options.media] is false or not breakpoints[options.media]?)
      else
        options.exit(mq) if typeof options.exit is "function" and (breakpoints[options.media] is true or not breakpoints[options.media]?)

      options.both(mq) if typeof options.both is "function"
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

    checkQuery = (parts) ->
      constraint = parts[1]
      dimension = parts[2]

      if parts[4]
        value = getPXValue(parseInt(parts[3], 10), parts[4])
      else
        value = parts[3]

      windowWidth = window.innerWidth || document.documentElement.clientWidth
      windowHeight = window.innerHeight || document.documentElement.clientHeight

      if dimension == 'width'
        matches = constraint is "max" and value > windowWidth or constraint is "min" and value < windowWidth
      else if dimension == 'height'
        matches = constraint is "max" and value > windowHeight or constraint is "min" and value < windowHeight
      else if dimension == 'aspect-ratio'
        ratio = windowWidth / windowHeight;

        matches = constraint is "max" and eval(ratio) < eval(value) or constraint is "min" and eval(ratio) > eval(value)

      return matches

    # No matchMedia support
    mmListener = ->
      medias = options.media.split(/\sand\s|,\s/)
      matches = true;

      for media in medias
        parts = media.match(/\((.*?)-(.*?):\s([\d\/]*)(\w*)\)/)
        matches = false unless checkQuery(parts);

      mqChange {media: options.media, matches: matches}, options


    if window.addEventListener
      window.addEventListener "resize", mmListener, false
    else
      if window.attachEvent
        window.attachEvent "onresize", mmListener

    mmListener()
