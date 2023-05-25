import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { BASE_URL, TOKEN_NAME } from "../../constants/url"
import { goToHomePage } from "../../routes/coordinator"
import labeLogoMini from "../../assets/labeLogoMini.png"
import { goToLoginPage } from "../../routes/coordinator"


const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 100px 0;
`;

const Section = styled.section`
  text-align: center;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f2f2f2;
  padding: 10px 20px;
`;

const LogoSmall = styled.img`
  width: 40px;
  height: 40px;
  margin: 0 auto;
`;

const ButtonEntrar = styled.button`
  background: transparent;
  border: none;
  color: #FF9800;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;
const Phrase = styled.p`
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;
const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormGroup = styled.section`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 300px;
    height: 40px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  span {
    display: flex;
    align-items: center;
    margin-top: 10px;

    input[type="checkbox"] {
      margin-right: 5px;
    }
  }
`;

const Button = styled.button`
  width: 300px;
  height: 40px;
  background: linear-gradient(to right, #ffd54f, #ff9800);
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SignupPage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    nickname: "",
    email: "",
    password: "",
    agreeEmails: false
  })

  const changeForm = (event) => {
    const { name, value, type, checked } = event.target
    const fieldValue = type === "checkbox" ? checked : value
    setForm({ ...form, [name]: fieldValue })
  }

  const createAccount = async (event) => { 
    event.preventDefault()

    try {
      setIsLoading(true)

      const response = await axios.post(`${BASE_URL}/users/signup`, form)
      if (response.status === 200) {
        const { token } = response.data
        localStorage.setItem("token", token)
        setIsLoading(false)
        goToLoginPage(navigate)
      } else {
        setIsLoading(false)
        console.log("Erro ao cadastrar")
      }
    } catch (error) {
      setIsLoading(false)
      console.error(error?.result?.data)
      window.alert(error?.result?.data)
    }
  }
  
  return (
    <div>
      <Header>
      <LogoSmall src={labeLogoMini} alt="Logo" />
      <ButtonEntrar onClick={() => goToLoginPage(navigate)}>Entrar</ButtonEntrar>
    </Header>
    
    <Main>
      <Section>
        <Phrase>Crie sua conta para começar a aproveitar!</Phrase>
        <Heading>Criar Conta</Heading>
  
        <Form onSubmit={createAccount} autoComplete="off">
          <FormGroup>
            <label>Apelido</label>
            <input
              name="nickname"
              type="text"
              value={form.nickname}
              onChange={changeForm}
            />
          </FormGroup>
  
          <FormGroup>
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={changeForm}
            />
          </FormGroup>
  
          <FormGroup>
            <label>Senha</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={changeForm}
            />
          </FormGroup>
  
          <p>
            Ao continuar você concorda com o nosso{" "}
            <a href="/contrato-de-usuario">contrato de usuário</a> e nossa{" "}
            <a href="/politica-de-privacidade">Política de Privacidade</a>.
          </p>
  
          <FormGroup>
            <input
              type="checkbox"
              name="agreeEmails"
              checked={form.agreeEmails}
              onChange={changeForm}
              required
            />
            Eu concordo em receber emails sobre coisas legais.
          </FormGroup>
  
          <Button disabled={isLoading}>Cadastrar</Button>
        </Form>
      </Section>
    </Main>
    </div>
    
  )
}
export default SignupPage