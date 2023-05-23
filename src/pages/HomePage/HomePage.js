import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { goToLoginPage } from "../../routes/coordinator";
import labeLogoMini from "../../assets/labeLogoMini.png";

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
  const navigate = useNavigate();

  const handleLogout = () => {
    goToLoginPage(navigate); // Redireciona para a página de login após logout
  };

  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);

  const handlePostSubmit = () => {
    // Lógica para enviar a postagem
    const newPost = {
      author: "Seu Apelido",
      content: postContent,
      likes: 0,
      dislikes: 0,
      comments: [],
    };

    setPosts((prevPosts) => [...prevPosts, newPost]);
    setPostContent("");
  };

  const renderPosts = () => {
    // Função para renderizar as postagens
    return posts.map((post, index) => (
      <Post key={index}>
        <p className="author">Enviado por: {post.author}</p>
        <p className="content">{post.content}</p>
        <div className="actions">
          <button>Like</button>
          <button>Dislike</button>
          <button>Inserir Comentário</button>
        </div>
      </Post>
    ));
  };
  
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
            value={postContent}
            onChange={(event) => setPostContent(event.target.value)}
          />
          <PostButton onClick={handlePostSubmit}>Postar</PostButton>
        </PostForm>
  
        <PostSeparator />
  
        <PostContainer>
          {renderPosts()}
        </PostContainer>
      </Main>
    </>
  );
}
export default HomePage