import React from 'react'

const UserCard = ({ user }) => {
    console.log(user.photoUrl);
    
  return (
    <div>
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img
                src={user?.photoUrl}
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{ user?.firstName }</h2>
               {user.age && user.gender ? `${user.age} • ${user.gender}` : ''}
                <p>{ user?.about }</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserCard