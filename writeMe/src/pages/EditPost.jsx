import React, { useEffect } from 'react'
import {Container, PostForm} from '../components/index'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'


function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug) {
            appwriteService.getPost(slug).then((post) => {
                if(post) {
                    setPost(post)
                }
            })
        } else {
            navigate("/")
        }
    },[slug, navigate])

  return post ?  (
    <div>EditPost</div>
  ) : null
}

export default EditPost