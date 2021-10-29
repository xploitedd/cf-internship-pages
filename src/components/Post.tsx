import { useState } from "react"
import Button from "./Button"
import PostContainer from "./PostContainer"

export interface PostProps {
    title: string
    user: string
    votes: number
    updateVotes: (type: 'inc' | 'dec') => void
}

const Post: React.FC<PostProps> = props => {
    const [votes, setVotes] = useState(props.votes)
    const upvote = () => {
        setVotes(v => v + 1)
        props.updateVotes('inc')
    }

    const downvote = () => {
        setVotes(v => v > 0 ? v - 1 : v)
        props.updateVotes('dec')
    }

    return (
        <PostContainer>
            <div className="flex space-x-10">
                <div className="flex-initial">
                    <div className="flex flex-col justify-between h-full">
                        <div className="flex-initial mb-3">
                            <Button size="small" onClick={upvote}>☝</Button>
                        </div>
                        <div className="flex-initial mb-5">
                            <Button size="small" onClick={downvote}>☟</Button>
                        </div>
                        <div className="flex-1 text-center">{votes}</div>
                    </div>
                </div>
                <div className="flex-1">
                    <h2 className="text-3xl font-bold">{props.title}</h2>
                    <span className="text-gray-500">by {props.user}</span>
                    <div className="mt-5 space-y-3">
                        {props.children}
                    </div>
                </div>
            </div>
        </PostContainer>
    )
}

export default Post