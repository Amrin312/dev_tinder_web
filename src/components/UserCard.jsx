import React from 'react'

const UserCard = ({ user }) => {

  if (!user) return null;

  const {
    firstName,
    lastName,
    age,
    gender,
    about,
    photoUrl,
    bio,
    skills
  } = user;

  const defaultAvatar = "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png";

  return (
    <div className="card bg-base-300 shadow-sm">

      <figure>
        <img
          src={photoUrl || defaultAvatar}
          alt={`${firstName} avatar`}
          className="w-full object-cover"
        />
      </figure>

      <div className="card-body">

        <h2 className="card-title">
          {firstName} {lastName}
        </h2>

        {gender && age && (
          <p className="text-sm opacity-80">
            {age} • {gender}
          </p>
        )}

        {bio && <p className="font-medium">{bio}</p>}

        {skills && (
          <p className="text-sm">
            {Array.isArray(skills) ? skills.join(', ') : skills}
          </p>
        )}

        {about && <p className="text-sm opacity-90">{about}</p>}

        <div className="card-actions justify-end mt-3">
          <button className="btn btn-primary btn-sm">Ignore</button>
          <button className="btn btn-secondary btn-sm">Interested</button>
        </div>

      </div>
    </div>
  )
}

export default UserCard;