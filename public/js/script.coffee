$doc                  = $ document
$recording_indicators = $ '.recording-indicator'
$commands             = $ '#commands'

config =
  endpoint: '/voice-command'
  witToken: 'L4LKEBK5JLCAGT2NUHB6XCWJMV55AWLL'

# Video stream

try new NodecopterStream document.getElementById('dronestream'), port: 3001
catch
  video       = $('<img id="video" src="" />').appendTo('#dronestream')
  updateVideo = -> video.attr('src', "/camera/#{new Date().getTime()}")
  do updateVideo
  setInterval updateVideo, 100

# Mic

mic = new Wit.Microphone document.getElementById 'mic-container'

spaceBar = 32 # key code for space bar
$doc.on 'keydown', (e) -> if e.keyCode is spaceBar then do mic.start and $recording_indicators.addClass    'active'
$doc.on 'keyup',   (e) -> if e.keyCode is spaceBar then do mic.stop  and $recording_indicators.removeClass 'active'

mic.onresult = (intent, entities, msg) ->
  if intent? then sendCommand.apply @, arguments
  else logError.apply @, arguments

# Sends a command to the server
sendCommand = (intent, entities, msg) ->
  $.post(config.endpoint, { intent, entities }).then -> logCommand intent

# Logs a misunderstood command
logError = (intent, entities, msg) -> logCommand msg.msg_body, ['error']

# Logs a successful command
logCommand = do ->
  commandsOnScreen = 0
  (msg, classes) ->
    el = $('<div class="command"></div>').addClass(classes).html(msg).hide().appendTo($commands).slideDown()
    commandsOnScreen += 1
    if commandsOnScreen > 5 then $('.command').first().slideUp('normal', -> do $(this).remove )
    el

mic.connect config.witToken
