// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

let client = AgoraRTC.createClient({ mode: 'rtc', 'codec': "vp8" })

let config = {
    appid: '67d005ec580847a29f227ce5d61f31b0',
    token: '007eJxTYCiwf/XzakfvPMZ7IQ6HCh+56Rkvm8c1o//tvNDVx+w+rtivwGBmnmJgYJqabGphYGFinmhkmWZkZJ6cappiZphmbJhkMHHC1JSGQEYG65NujIwMEAjiMzEEOzIwAACV3R/o',
    uid: null,
    channel: 'SA',
}

let localTracks = {
    audioTracks: null,
    videoTracks: null,

}

let remoteTracks = {

}

document.getElementById('join-btn').addEventListener('click', async () => {
    console.log('User Joined Stream')
    config.uid = document.getElementById('username').value
    await joinStreams()
})

let joinStreams = async () => {

    [config.uid, localTracks.audioTrack, localTracks.videoTrack] = await Promise.all([
        client.join(config.appid, config.channel, config.token || null, config.uid || null),
        AgoraRTC.createMicrophoneAudioTrack(),
        AgoraRTC.createCameraVideoTrack()


    ])
    
    let player = `<div class="video-containers" id="video-wrapper-${config.uid}">
                        <p class="user-uid"><img class="volume-icon" id="volume-${config.uid}" src="./assets/volume-on.svg" /> ${config.uid}</p>
                        <div class="video-player player" id="stream-${config.uid}"></div>
                  </div>`

    document.getElementById('user-streams').insertAdjacentHTML('beforeend', player);

    localTracks.videoTrack.play(`stream-${config.uid}`)


    
    await client.publish([localTracks.audioTrack, localTracks.videoTrack])
}