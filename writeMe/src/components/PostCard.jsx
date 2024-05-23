import React from 'react'
import appwriteService from '../appwrite/config'
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {

  return (
    <Link to={`/post/${$id}`} >
        <div  style={{backgroundColor:"#4D869C"}} className='w-full rounded-xl p-4 shadow-xl'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl' />
            </div>
            <h2 className='text-xl font-bold text-white'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard