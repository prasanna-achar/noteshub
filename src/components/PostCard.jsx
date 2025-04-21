import React from 'react'
import service from '../appwrite/config'
import {Link} from 'react-router-dom'

 function PostCard({
    $id, title, featuredImage
}) {
  return (
    <Link to={`/post/${$id}`} className="block">
      <div className="w-full h-70 bg-gray-100 rounded-xl p-4 shadow-md hover:shadow-lg transition duration-300">
        {/* Image Container */}
        <div className="w-full flex justify-center mb-4">
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 text-center">{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard