import React, {useCallback} from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, Select, RTE} from '../index'
import service from '../../appwrite/config'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function PostForm({post}) {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues :{
            title: post?.title || '',
            slug : post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active'
        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state)=>state.auth.userData)
    const submit = async(data) =>{
        if(post){
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
            
            if(file){
                await service.deleteFile(post.featuredImage)
            }

            const dbPost = await service.updatePost(data.slug,
                {
                    ...data,
                    featuredImage:  file ? file.$id : post.featuredImage
                }

            )
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }else{
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
            if(file){
                const fileId = file.$id;
                data.featuredImage = fileId
                const dbPost = await service.createPost({
                    ...data,
                    userId : userData.$id
                })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) =>{
        if(value && typeof value === 'string'){
            return value
            .trim()
            .toLowerCase()
            .replace(/\s/g, '-')
        }
        return ''
    }, [])

    React.useEffect(() =>{
        const subsrciption = watch((value, {name}) => {
            if(name === 'title'){
                setValue('slug', slugTransform(value.title),
            {shouldValidate: true})
            }
        })

        return () =>{ 
            subsrciption.unsubscribe()
        }
    } 
    , [watch, slugTransform, setValue])
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap flex-row gap-4">
    {/* Left Section */}
        <div className="w-full md:w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                setValue("slug", post ? post.slug : "");
                setValue("slug", slugTransform(e.currentTarget.value), {
                    shouldValidate: true,
                });
                }}
            />
            <RTE
                label="Content :"
                name="content"
                control={control}
                defaultValue={getValues("content")}
            />
            </div>
        
            {/* Right Section */}
            <div className="w-full md:w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                <img
                    src={service.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg w-full max-h-[250px] object-cover shadow-md"
                />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button
                type="submit"
                bgColor={post ? "bg-green-500" : "bg-blue-500"}
                className="w-full py-2 text-white font-semibold"
            >
                {post ? "Update" : "Submit"}
            </Button>
            </div>
        </form>
        
    )
}

