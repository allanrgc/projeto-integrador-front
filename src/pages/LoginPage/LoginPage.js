import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { BASE_URL, TOKEN_NAME } from "../../constants/url"
import { goToHomePage, goToSignupPage } from "../../routes/coordinator"
import labeLogo from "../../assets/labeLogo.png"

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 100px 0

  @media (max-width: 768px) {
    padding: 50px 0;
  }
`;

const Section = styled.section`
  text-align: center;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const Logo = styled.img`
  width: 150px;
  height: 150px;
  margin-top: 40px;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
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

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 10px;
  }
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
  background: linear-gradient(to right, #FFD54F, #FF9800);
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SecondaryButton = styled.button`
  margin-top: 10px;
  background: transparent;
  color: #FF9800;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
`;

const LoginPage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errorLogin, setErrorLogin] = useState("Email ou senha inválidos")
  const [errorMessage, setErrorMessage] = useState("Tente novamente")
  const changeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const login = async (event) => {
    event.preventDefault()
    try {
      
      setIsLoading(true)

      const response = await axios.post(`${BASE_URL}/users/login`, form)

      if (response.status === 200) {
        const { token } = response.data
        console.log(response, token)
        localStorage.setItem("token", token)
        setIsLoading(false)
        goToHomePage(navigate)
      } else {
        console.log(response)
        setIsLoading(false)
        setErrorLogin("Email ou senha inválidos")
      }
    } catch (error) {
      setIsLoading(false)
      console.error(error?.response?.data)
      window.alert(error?.response?.data)
      setErrorMessage("Tente novamente")
    }
  }
  

  return (
    <Main>
      <Section>
      <Logo src={labeLogo} alt="Logo" />
      <Phrase>Seja bem-vindo! Faça login para continuar.</Phrase>
        <Heading>Faça o login</Heading>

        <Form onSubmit={login} autoComplete="off">
          <FormGroup>
            <input
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={changeForm}
            />
          </FormGroup>

          <FormGroup>
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={changeForm}
            />

            <span>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(true)}
                  />
                  Mostrar Senha
                </span>
              </FormGroup>
      
              <Button disabled={isLoading}>Entrar</Button>
            </Form>
      
            <h2>
              Ainda não tem conta?{" "}
              <SecondaryButton
                disabled={isLoading}
                onClick={() => goToSignupPage(navigate)}
              >
                Cadastre-se!
              </SecondaryButton>
            </h2>
      
            <hr />
          </Section>
        </Main>
      )
}
      export default LoginPage
      