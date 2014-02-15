# AR Drone Voice Commands

Using [wit.ai](wit.ai)'s API control your AR drone with voice commands.

## Commands currently supported

- back
- clockwise (turn right)
- counter clockwise (turn left)
- forward
- land
- stop
- takeoff

## Usage

1. For wit.ai to be accessible from your computer you need to be connected to the internet and your AR Drone at the same time.  I was able to connect my AR Drone to my wifi access point using [ardrone-wpa2](https://github.com/daraosn/ardrone-wpa2).
2. Clone the repo onto your computer.
3. Run `npm install`
  - This step requires you to have [bower](https://github.com/bower/bower) installed globally.
4. Set your drone's IP address in `config/config.js`.
5. Run `npm start` to start the web server.
4. Navigate a web browser to `localhost:3000` (or whatever port you have configured in `config/config.js`).
5. Hold `spacebar` to record commands.
