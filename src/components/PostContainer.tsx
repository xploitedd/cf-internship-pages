const PostContainer: React.FC<{}> = props => {
    return (
        <div className="flex-initial w-full bg-gray-900 rounded-lg shadow-md p-10 text-gray-200">
            {props.children}
        </div>
    )
}

export default PostContainer