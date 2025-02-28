const NPCList = ({ npcs, onEditNpc }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Bioma</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {npcs.map((npc) => (
            <tr key={npc.id}>
              <td>{npc.nome}</td>
              <td>{npc.bioma}</td>
              <td>
                <button
                  onClick={() => onEditNpc(npc)}
                  className="btn btn-sm btn-primary"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NPCList;