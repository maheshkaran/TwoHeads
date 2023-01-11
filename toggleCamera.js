function toggleCamera() {
    if (!cameraEnabled) {
      // Stop all tracks on the local stream
      localVideo.srcObject.getTracks().forEach(track => track.stop());
      // Set the button text
      cameraToggleButton.textContent = 'Turn Camera On';
      cameraEnabled = false;
    } else {
      // Get access to the camera and display the video stream on the localVideo element
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          localVideo.srcObject = stream;
          stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
        });
      // Set the button text
      cameraToggleButton.textContent = 'Turn Camera Off';
      cameraEnabled = true;
    }
  }