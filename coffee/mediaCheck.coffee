window.mediaCheck = (options) ->
  mq = undefined
  mqChange = undefined
  createListener = undefined
  convertEmToPx = undefined
  getPXValue = undefined
  matchMedia = window.matchMedia isnt `undefined` and !!window.matchMedia("").addListener
  if matchMedia
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

    # pageWidth is initialized during initial match
    pageWidth = undefined
    breakpoints = {}
    options.debounce = options.debounce || 250
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
      document.body.appendChild emElement
      value * emElement.offsetWidth

    getPXValue = (width, unit) ->
      value = undefined
      switch unit
        when "em"
          value = convertEmToPx(width)
        else
          value = width

    ###
    Throttle function from @rem http://remysharp.com/2010/07/21/throttling-function-calls/
    ###
    throttle = (fn, threshhold, scope) ->
      threshhold or (threshhold = 250)
      last = undefined
      deferTimer = undefined
      ->
        context = scope or this
        now = +new Date
        args = arguments
        if last and now < last + threshhold
          # hold on to it
          clearTimeout deferTimer
          deferTimer = setTimeout(->
            last = now
            fn.apply context, args
          , threshhold)
        else
          last = now
          fn.apply context, args


    # Create list of breakpoints
    for i of options
      breakpoints[options.media] = null

    # No matchMedia support
    mmListener = ->
      console.log "fire"
      parts = options.media.match(/\((.*)-.*:\s*([\d\.]*)(.*)\)/)
      constraint = parts[1]
      value = getPXValue(parseInt(parts[2], 10), parts[3])
      fakeMatchMedia = {}
      clientWidth = document.documentElement.clientWidth

      # scope this to width changes to prevent small-screen scrolling (browser chrome off-screen)
      #   from triggering a change
      unless pageWidth is clientWidth
        fakeMatchMedia.matches = constraint is "max" and value > clientWidth or constraint is "min" and value < clientWidth
        mqChange fakeMatchMedia, options

        # reset pageWidth
        pageWidth = clientWidth

    if window.addEventListener
      window.addEventListener "resize", throttle(mmListener, options.debounce)
    else
      if window.attachEvent
        window.attachEvent "onresize", throttle(mmListener, options.debounce)

    mmListener()
