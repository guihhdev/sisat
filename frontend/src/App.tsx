import './App.css';
import { useState } from 'react';

export default function App() {
  // 1. Estados sempre no topo do componente
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cpf, password }),
      });

      const data = await res.json();
      console.log(data);

      // CORREÇÃO: Usamos res.ok para verificar se o status é 200-299
      // ou verificamos a mensagem que vimos no seu console
      if (data.message === 'Login feito com sucesso') {
        alert("Login realizado!");
        
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
      } else {
        alert("Erro no login: " + (data.message || "Credenciais inválidas"));
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="login-container">
      <div className='login-card'>
        {/* Cabeçalho */}
        <div className='login-header'>
          <div className='logo-placeholder'> 💧 </div>
          <h2> Bem vindo ao SISAT </h2>
          <p> Entre para continuar </p>
        </div>

        {/* Botão do Google */}
        <button className='google-btn' type="button">
          <span>G</span> Continue com Google
        </button>

        {/* Divisor "OR" */}
        <div className='divider'>
          <span>OR</span>
        </div>

        {/* Formulário */}
        <form className='login-form' onSubmit={handleLogin}>
          <div className='input-group'>
            <label htmlFor='cpf'>CPF</label>
            <input 
              type='text' 
              id='cpf' 
              placeholder='000.000.000-00' 
              value={cpf} 
              onChange={(e) => setCpf(e.target.value)}
              required 
            />
          </div>

          <div className='input-group'>
            <label htmlFor='senha'>Senha</label>
            <input 
              type='password' 
              id='senha' 
              placeholder='••••••••' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type='submit' className='submit-btn'>
            Entrar
          </button>
        </form>

        {/* Links de Rodapé */}
        <div className='login-footer'>
          <a href='#esqueceu'>Esqueci minha senha</a>
          <span>Não tem uma conta? <a href='#cadastrese'>Cadastre-se</a></span>
        </div>
      </div>
    </div>
  );
}