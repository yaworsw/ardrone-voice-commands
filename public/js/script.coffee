$doc   = $ document
$recording_indicators = $ '.recording_indicators'

config =
  endpoint: '/voice-command'
  witToken: 'L4LKEBK5JLCAGT2NUHB6XCWJMV55AWLL'

mic = new Wit.Microphone document.getElementById 'mic-container'

$doc.on 'keydown', (e) -> if e.keyCode is 32 then do ->
  $recording_indicators.addClass 'active'
  do mic.start

$doc.on 'keyup',   (e) -> if e.keyCode is 32 then do ->
  $recording_indicators.removeClass 'active'
  do mic.stop

mic.onresult = (intent, entities, msg) ->
  if not intent? then do ->

  else $.post(config.endpoint, { intent, entities }).then ->
    console.log intent
    console.log entities

mic.connect config.witToken
