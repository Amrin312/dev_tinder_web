import React from 'react'
import Webcam from "react-webcam";

const ProfileUpload = () => {
  return (
    <div>
        <dialog open className="modal">
                    <div className="modal-box max-w-2xl">

                    <h3 className="font-bold text-lg mb-4 text-center">
                        Capture Profile Photo
                    </h3>

                    <div className="flex justify-center">
                        <Webcam
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{
                            width: 500,
                            height: 500,
                            facingMode: "user"
                        }}
                        className="rounded-xl shadow-lg"
                        />
                    </div>

                    <div className="modal-action justify-center mt-6 gap-4">
                        <button
                        className="btn btn-outline"
                        onClick={() => setShowCamera(false)}
                        >
                        Cancel
                        </button>

                        <button
                        className="btn btn-primary"
                        onClick={capturePhoto}
                        >
                        Capture
                        </button>
                    </div>

                    </div>

                
                </dialog>
    </div>
  )
}

export default ProfileUpload