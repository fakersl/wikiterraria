"use client"

import { useEffect, useState } from 'react';
import NPCList from '../../components/npcList';
import NPCForm from '../../components/npcForm';

export default function Home() {
  const [npcs, setNpcs] = useState([]);
  const [editingNpc, setEditingNpc] = useState(null);

  useEffect(() => {
    const fetchNpcs = async () => {
      const res = await fetch('http://localhost:5000/api/items');
      const data = await res.json();
      setNpcs(data);
    };

    fetchNpcs();
  }, [npcs]);

  const handleEditNpc = (npc) => {
    setEditingNpc(npc);
  };

  return (
    <div>
      <h1>Painel de Administração de NPCs</h1>
      <NPCForm npc={editingNpc} />
      <NPCList npcs={npcs} onEditNpc={handleEditNpc} />
    </div>
  );
}