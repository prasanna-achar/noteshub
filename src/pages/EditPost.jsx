import React, {useEffect, useState} from 'react'
import { Container, PostForm } from '../components'
import service from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [posts, setPosts] = useState()
    const {slug} = useParams()
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(slug){
            service.getPost(slug).then((post) =>{
                if(post){
                    setPosts(post)
                }
            })
        }else{
            navigate('/')
        }
    }, [slug, navigate])
  return posts ? (
    <div>
        <Container>
            <PostForm post={posts} />
        </Container>
    </div>
  ):
  null;
}

export default EditPost