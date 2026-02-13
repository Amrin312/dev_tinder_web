import React from 'react'

const UserCard = ({ user }) => {

    const {firstName, lastName, age, gender, about, photoUrl} = user;

  return (
        <div className="card bg-base-300 w-full md:w-1/4 shadow-sm">
            <figure>
                <img
                src={photoUrl ? photoUrl : 'https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png'}
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
                <p>{about}</p>
                {gender && age && <p>{`${age} ${gender}`}</p>}

                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-primary">Intrested</button>

                </div>
            </div>
        </div>
  )
}

export default UserCard