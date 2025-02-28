"use client";

import { useEffect, useState } from "react";
import NPCList from "../../components/npcList";
import NPCForm from "../../components/npcForm";

export default function Home() {
  const [npcs, setNpcs] = useState([]);
  const [editingNpc, setEditingNpc] = useState(null);

  // useEffect sem dependência para garantir que a chamada seja feita uma vez
  useEffect(() => {
    const fetchNpcs = async () => {
      const res = await fetch("http://localhost:5000/npcs"); // Corrigido o endpoint da API
      const data = await res.json();
      setNpcs(data);
    };

    fetchNpcs();
  }, []); // Agora, a dependência está vazia, logo o efeito só roda uma vez

  const handleEditNpc = (npc) => {
    setEditingNpc(npc);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-4 py-2">
      <table className="w-full text-sm text-left rounded-full text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              NPC
            </th>
            <th scope="col" className="px-6 py-3">
              Geração
            </th>
            <th scope="col" className="px-6 py-3">
              Bioma
            </th>
            <th scope="col" className="px-6 py-3">
              Quem gosta
            </th>
          </tr>
        </thead>
        <tbody>
          {npcs.map((npc) => (
            <tr
              key={npc.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id={`checkbox-table-search-${npc.id}`}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={`checkbox-table-search-${npc.id}`}
                    className="sr-only"
                  >
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <img
                  className="w-10 h-10"
                  src={npc.imagem || ""}
                  alt={`Imagem do ${npc.nome}`}
                />
                <div className="ps-3">
                  <div className="text-base font-semibold">{npc.nome}</div>
                  <div className="font-normal text-gray-500">{npc.bioma}</div>
                </div>
              </th>
              <td className="px-6 py-4">{npc.ama}</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                  Online
                </div>
              </td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  type="button"
                  data-modal-target="editUserModal"
                  data-modal-show="editUserModal"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => handleEditNpc(npc)}
                >
                  Editar
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}