// Add JavaScript to handle user interactions
const startCallButton = document.getElementById('start-call-button');
startCallButton.addEventListener('click', startCall);
const cameraToggleButton = document.getElementById('camera-toggle-button');
cameraToggleButton.addEventListener('click', toggleCamera);

let cameraEnabled = true;

function startCall() {
    // Get a reference to the video elements
    const localVideo = document.getElementById('localVideo');
    const remoteVideo = document.getElementById('remoteVideo');

    // Set up the peer connection and start the call
    const peerConnection = new RTCPeerConnection();
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        localVideo.srcObject = stream;
        stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
    })
    .then(() => peerConnection.createOffer())
    .then(offer => peerConnection.setLocalDescription(offer))
    .then(() => {
        // Send the offer to the other peer using your signaling server
        sendToServer({
        type: 'offer',
        sdp: peerConnection.localDescription
        });
    });

    // Set up event listeners to handle incoming calls
    peerConnection.ontrack = event => {
    remoteVideo.srcObject = event.streams[0];
    };
    peerConnection.onicecandidate = event => {
    if (event.candidate) {
        sendToServer({
        type: 'candidate',
        candidate: event.candidate
        });
    }
    };

    // Hide the start call button and show the whiteboard
    document.getElementById('start-call-button').style.display = 'none';
    document.getElementById('whiteboard-container').style.display = 'block';
}