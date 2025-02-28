// frontend/components/NPCForm.js
import { useState } from "react";

export default function NPCForm({ npc }) {
  const [nome, setNome] = useState(npc ? npc.nome : "");
  const [bioma, setBioma] = useState(npc ? npc.bioma : "");
  const [ama, setAma] = useState(npc ? npc.ama : "");
  const [gosta, setGosta] = useState(npc ? npc.gosta : "");
  const [odeia, setOdeia] = useState(npc ? npc.odeia : "");
  const [imagem, setImagem] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("bioma", bioma);
    formData.append("ama", ama);
    formData.append("gosta", gosta);
    formData.append("odeia", odeia);
    if (imagem) formData.append("imagem", imagem);

    const res = npc
      ? await fetch(`http://localhost:5000/api/items/${npc.id}`, {
          method: "PUT",
          body: formData,
        })
      : await fetch("http://localhost:5000/api/items", {
          method: "POST",
          body: formData,
        });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <h2>{npc ? "Editar NPC" : "Adicionar NPC"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          required
        />
        <input
          type="text"
          value={bioma}
          onChange={(e) => setBioma(e.target.value)}
          placeholder="Bioma"
          required
        />
        <input
          type="text"
          value={ama}
          onChange={(e) => setAma(e.target.value)}
          placeholder="Quem ele ama"
        />
        <input
          type="text"
          value={gosta}
          onChange={(e) => setGosta(e.target.value)}
          placeholder="Quem ele gosta"
        />
        <input
          type="text"
          value={odeia}
          onChange={(e) => setOdeia(e.target.value)}
          placeholder="Quem ele odeia"
        />
        <input type="file" onChange={(e) => setImagem(e.target.files[0])} />
        <button type="submit">{npc ? "Atualizar" : "Adicionar"}</button>
      </form>
    </div>
  );
}