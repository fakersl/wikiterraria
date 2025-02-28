import { useState, useEffect } from 'react';

const NPCForm = ({ npc }) => {
  const [nome, setNome] = useState(npc?.nome || '');
  const [bioma, setBioma] = useState(npc?.bioma || '');
  const [imagem, setImagem] = useState(npc?.imagem || '');
  const [ama, setAma] = useState(npc?.ama || '');
  const [gosta, setGosta] = useState(npc?.gosta || '');
  const [naoGosta, setNaoGosta] = useState(npc?.nao_gosta || '');
  const [odeia, setOdeia] = useState(npc?.odeia || '');

  useEffect(() => {
    if (npc) {
      setNome(npc.nome);
      setBioma(npc.bioma);
      setImagem(npc.imagem);
      setAma(npc.ama);
      setGosta(npc.gosta);
      setNaoGosta(npc.nao_gosta);
      setOdeia(npc.odeia);
    }
  }, [npc]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newNpc = {
      nome,
      bioma,
      imagem,
      ama,
      gosta,
      nao_gosta: naoGosta,
      odeia,
    };

    // Enviar os dados para o backend
    const response = await fetch('http://localhost:5000/npcs', {
      method: npc ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNpc),
    });

    if (response.ok) {
      // Aqui você pode adicionar lógica para tratar o sucesso
      alert('NPC salvo com sucesso!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-control">
        <label htmlFor="nome" className="label">
          <span className="label-text">Nome</span>
        </label>
        <input
          id="nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="input input-bordered w-full"
          required
        />
      </div>

      <div className="form-control">
        <label htmlFor="bioma" className="label">
          <span className="label-text">Bioma</span>
        </label>
        <input
          id="bioma"
          type="text"
          value={bioma}
          onChange={(e) => setBioma(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      {/* Outros campos... */}

      <button type="submit" className="btn btn-primary w-full mt-4">
        {npc ? 'Editar NPC' : 'Adicionar NPC'}
      </button>
    </form>
  );
};

export default NPCForm;