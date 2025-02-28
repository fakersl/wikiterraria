import { useState } from "react";

export default function Dashboard() {
  const [nome, setNome] = useState("");
  const [bioma, setBioma] = useState("");
  const [ama, setAma] = useState("");
  const [imagem, setImagem] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/npcs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, bioma, ama, imagem }),
    });

    if (res.ok) {
      const newNpc = await res.json();
      setMessage(`NPC "${newNpc.nome}" adicionado com sucesso!`);
      setNome("");
      setBioma("");
      setAma("");
      setImagem("");
    } else {
      setMessage("Erro ao adicionar NPC");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Cadastrar NPC</h2>
      
      {message && <p className="mb-4 text-center text-green-500">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="nome">
            Nome do NPC
          </label>
          <input
            type="text"
            id="nome"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="bioma">
            Bioma
          </label>
          <input
            type="text"
            id="bioma"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={bioma}
            onChange={(e) => setBioma(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="ama">
            Quem o NPC ama
          </label>
          <input
            type="text"
            id="ama"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={ama}
            onChange={(e) => setAma(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="imagem">
            URL da Imagem
          </label>
          <input
            type="text"
            id="imagem"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-md"
        >
          Cadastrar NPC
        </button>
      </form>
    </div>
  );
}