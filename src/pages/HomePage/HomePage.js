import { useState, useEffect  } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { goToLoginPage } from "../../routes/coordinator"
import labeLogoMini from "../../assets/labeLogoMini.png"
import postCRUD from "../../components/postCRUD"

const Header = styled.header`
  background-color: #f2f2f2;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoSmall = styled.img`
  width: 40px;
  height: 40px;
`;

const ButtonLogout = styled.button`
  background: transparent;
  color: #ff9800;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
`;

const Main = styled.main`
  padding: 40px;
`;

const PostForm = styled.div`
  margin-bottom: 20px;
`;

const PostInput = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const PostButton = styled.button`
  margin-top: 10px;
  background-color: #ff9800;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const PostSeparator = styled.hr`
  margin: 40px 0;
  border: none;
  border-top: 1px solid #ccc;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Post = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 4px;

  .author {
    font-weight: bold;
  }

  .content {
    margin-top: 10px;
  }

  .actions {
    margin-top: 10px;
  }

  button {
    margin-right: 10px;
  }
`;






const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [content, setContent] = useState("")

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    setIsLoading(true)
    const headers = {
      Authorization: headers
    }

    const response = await postCRUD.getPosts(headers)
    if (response) {
      setPosts(response)
    }
    setIsLoading(false)
  }

  const createNewPost = async () => {
    setIsLoading(true)
    const headers = {
      Authorization: headers
    }
    const body = {
      content: content
    }

    const response = await postCRUD.createPost(headers, body)
    if (response) {
      setContent("")
      fetchPosts()
    }
    setIsLoading(false)
  }

  const likeDislikePost = async (postId, isLike) => {
    setIsLoading(true)
    const headers = {
      Authorization: headers
    }
    const body = {
      like: true
    }

    const response = await postCRUD.likeDislikePost(headers, body, postId)
    if (response) {
      fetchPosts()
    }
    setIsLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    return window.alert("Você saiu :'(")
  }

  const renderPosts = () => {
    return (
      <>
        {isLoading ? (
          <p>Carregando posts...</p>
        ) : (
          posts.map((post) => (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <button onClick={() => likeDislikePost(post.id, true)}>Like</button>
              <button onClick={() => likeDislikePost(post.id, false)}>Dislike</button>
            </div>
          ))
        )}
      </>
    )
  }

  return (
    <>
      <Header>
        <div>
          <LogoSmall src={labeLogoMini} alt="Logo Small" />
        </div>
        <ButtonLogout onClick={handleLogout}>Logout</ButtonLogout>
      </Header>
      <Main>
        <PostForm>
          <PostInput
            placeholder="Escreva sua postagem..."
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <PostButton onClick={createNewPost}>Postar</PostButton>
        </PostForm>

        <PostSeparator />

        <PostContainer>
          {renderPosts()}
        </PostContainer>
      </Main>
    </>
  )
}

export default HomePage
