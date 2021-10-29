import { FormEventHandler, useEffect, useMemo, useState } from "react"
import useFetch, { CachePolicies } from "use-http"
import Button from "./components/Button"
import Post from "./components/Post"
import PostContainer from "./components/PostContainer"
import PostView from "./components/PostView"

interface PostInfo {
    title: string
    content: string
    username: string
    votes: number
}

// TODO: use an environment variable
const API_URI = "https://monkebook.xploit3d.workers.dev/posts"

const App: React.FC<{}> = () => {
    const [posts, setPosts] = useState<PostInfo[]>([])
    const { get, response: feedResponse, loading: feedLoading, error: feedError } = useFetch(API_URI)
    const { post, response: publishResponse, loading: publishLoading, error: publishError } = useFetch(API_URI)
    const { post: updateVotes } = useFetch(`${API_URI}/vote`, { cachePolicy: CachePolicies.NO_CACHE })

    useEffect(() => {
        const loadInitialData = async () => {
            const initialPosts = await get()
            if (feedResponse.ok)
                setPosts(initialPosts)
        }

        loadInitialData()
    }, [get, feedResponse])

    const publishPost: FormEventHandler = async e => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const title = formData.get('title') as string
        const content = formData.get('content') as string
        const username = formData.get('username') as string

        const toPublish: PostInfo = { title, content, username, votes: 0 }

        await post(toPublish)
        if (publishResponse.ok) {
            setPosts(cur => [toPublish, ...cur])
            const form = e.target as HTMLFormElement
            form.reset()
        }
    }

    const postsJSX = useMemo(() => {
        return posts.map((post, id) => {
            const paragraphs = post.content.split('\n')
                .map((p, pId) => (<p key={pId}>{p}</p>))

            return (
                <Post key={`post-${posts.length - id}`} title={post.title} user={post.username} votes={post.votes} updateVotes={type => updateVotes({ id, type })}>
                    {paragraphs}
                </Post>
            )
        })
    }, [posts, updateVotes])

    return (
        <div className="bg-gray-800 min-h-screen py-16 px-10 md:px-24 lg:px-48 xl:px-96">
            <h1 className="text-gray-400 font-bold text-5xl md:text-8xl">monkebook</h1>
            <PostView>
                {publishError && <div className="bg-red-500 text-center rounded-md shadow-md text-gray-200 py-5 px-10">
                    An error has occurred while publishing your post
                </div>}
                <PostContainer>
                    <form className="space-y-3" onSubmit={publishPost}>
                        <h2 className="text-3xl italic">Write someting meaningful <span className="text-gray-500 text-xl">(or don't)</span></h2>
                        <input required type="text" className="rounded-md shadow-md bg-gray-600 py-2 px-3 mr-3 w-full" placeholder="Title" name="title"></input>
                        <textarea required rows={5} className="rounded-md shadow-md bg-gray-600 py-2 px-3 w-full" placeholder="pls write something..." name="content"></textarea>
                        <input required type="text" className="rounded-md shadow-md bg-gray-600 py-2 px-3 mr-3" placeholder="Username" name="username"></input>
                        <Button disabled={publishLoading} buttonType="submit">Publish</Button>
                    </form>
                </PostContainer>
                {feedLoading && <h2 className="text-gray-300 font-bold text-3xl animate-pulse text-center">Loading the best posts :)</h2>}
                {feedError && <h2 className="text-gray-300 font-bold text-3xl text-center">An error has occurred while loading the feed :(</h2>}
                {postsJSX}
            </PostView>
        </div>
    )
}

export default App
