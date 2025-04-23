import React , {useState, useEffect} from 'react'
import service from '../appwrite/config'
import { PostCard, Container } from '../components'

function AllPosts() {
    const [posts, setPosts] = useState([])


    useEffect(()=>{
        service.getPosts([]).then((posts) => {
            if(posts){
                setPosts(posts.documents.reverse())
            }
        })
    }, [])

    
  return (
    <div className="py-8 px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
            ))}
        </div>
    </div>
  )
}

export default AllPosts