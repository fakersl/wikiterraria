// frontend/components/NPCList.js
export default function NPCList({ npcs, onEditNpc }) {
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/items/${id}`, { method: "DELETE" });
    onEditNpc(null); // Resetando a edição após a exclusão
  };

  return (
    <div>
      <h2>Lista de NPCs</h2>
      <ul>
        {npcs.map((npc) => (
          <li key={npc.id}>
            <span>{npc.nome}</span> - <span>{npc.bioma}</span>
            <button onClick={() => onEditNpc(npc)}>Editar</button>
            <button onClick={() => handleDelete(npc.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}