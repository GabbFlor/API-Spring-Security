import axios from "axios";
import { useState } from "react";
import '../styles/LoginRegistro.css';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        if (nome == "" || senha == "") {
            alert("Preencha todos os campos.")
        } else {
            axios.post('http://localhost:8080/auth/login', {
                login: nome,
                password: senha
            })
            .then(response => {
              if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Sucesso",
                        text: `Bem vindo ${nome}`,
                        timer: 1500
                    })
                    .then(() => {
                        const token = response.data.token;

                        // armazena o token no armazenamento local, para que continue armazenado mesmo após fechar o navegador 
                        localStorage.setItem("token", token);

                        // futuramente colocar para redirecionar para a rota "/" aqui
                        window.location.href = '/'
                    })
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    Swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: `Nome de usuário ou senha incorretos`,
                        timer: 1500
                    })

                    setNome("")
                    setSenha("")
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: `Erro interno no servidor: ${error.message}`,
                        timer: 1500
                    })
                }
            })
        }
    }

    return (
        <main>
            <form action="" className="form registro" onSubmit={handleLogin}>
                <h1>Entrar</h1>

                <div className="div-input">
                    <label htmlFor="name">Nome:</label>
                    <input 
                        type="text" 
                        placeholder="Nome" 
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>

                <div className="div-input">
                    <label htmlFor="senha">Senha:</label>
                    <input 
                        type="password" 
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>

                <button type="submit" className="btn green">Entrar</button>
                <Link to={'/registro'} className="link">Não tenho uma conta</Link>
            </form>
        </main>
    );
}

export default Login;