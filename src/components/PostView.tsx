const PostView: React.FC<{}> = props => {
    return (
        <div className="flex flex-col mt-5 space-y-5">
            {props.children}
        </div>
    )
}

export default PostView