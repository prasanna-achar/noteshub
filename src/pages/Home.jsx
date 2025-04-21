import React, {useState, useEffect} from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux'
function Home() {

    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(()=>{
        service.getPosts().then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        })
    }, [])

  if(posts.length === 0){
    return(
        <div className='w-full py-8 mt-4 text-center'>
            <Container>
                <div className='flex flex-wrap'>
                    <div className='p-2 w-full'>
                        <h1 className='text-2xl font-bold hover:text-gray-500'>
                            {authStatus ?(<>Loading.....</>):(<>Login to read Posts</>)}
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )
  }
  return(
    <div className="py-8 px-8">
        <h1 className='text-center text-4xl font-bold mb-6 mt-9 '>Welcome</h1>
        <Link to='/all-posts'>
            <h3  className=' inline text-xl font-bold mb-2 mt-2 underline hover:opacity-50 transition-all '>See More....</h3>
            </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            
        {posts.map((post, index) => {
            if(index >= 4){
                return;
            }
            else{
               return <PostCard key={post.$id} {...post} />
            }
        }
           
        )}
        </div>
    </div>
  
  )
}

export default Home