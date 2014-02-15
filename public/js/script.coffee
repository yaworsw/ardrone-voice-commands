$doc                  = $ document
$recording_indicators = $ '.recording_indicators'
$commands             = $ '#commands'

config =
  endpoint: '/voice-command'
  witToken: 'L4LKEBK5JLCAGT2NUHB6XCWJMV55AWLL'

# Video stream

new NodecopterStream(
    document.getElementById('dronestream'),
    { port: 3001 }
)


# Mic

mic = new Wit.Microphone document.getElementById 'mic-container'

$doc.on 'keydown', (e) -> if e.keyCode is 32 then do ->
  $recording_indicators.addClass 'active'
  do mic.start

$doc.on 'keyup',   (e) -> if e.keyCode is 32 then do ->
  $recording_indicators.removeClass 'active'
  do mic.stop

mic.onresult = (intent, entities, msg) ->
  if not intent? then do ->
    $commands.append $ '<div class="error command">Could not understand' + msg.msg_body + '</div>'
  else $.post(config.endpoint, { intent, entities }).then ->
    $commands.append $ '<div class="command">' + intent + '</div>'

mic.connect config.witToken
