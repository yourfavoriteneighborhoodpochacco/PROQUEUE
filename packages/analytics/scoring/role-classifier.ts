import { Role } from '@proqueue/shared/enums/role';

// Valorant agent UUIDs mapped to roles.
// UUIDs are stable across patches — names can change, IDs don't.
const AGENT_ROLE_MAP: Record<string, Role> = {
  // Duelists
  '7f94d92c-4234-0a36-9646-3a87eb8b5c89': Role.Duelist, // Jett
  'a3bfb853-43b2-7238-a4f1-ad90e9e46bcc': Role.Duelist, // Reyna
  '9f0d8ba9-4140-b941-57d3-a7ad57c6b417': Role.Duelist, // Phoenix
  '95b78ed7-4637-86d9-7e41-71ba8c293152': Role.Duelist, // Neon
  'bb2a4828-46eb-8cd1-e765-15848195d751': Role.Duelist, // Iso

  // Initiators
  '601dbbe7-43ce-be57-2a40-4abd24953621': Role.Initiator, // KAY/O
  '1e58de9c-4950-5125-93e9-a0aee9f98746': Role.Initiator, // Killjoy (re-check)
  '5f8d3a7f-467b-97f3-062c-13acf203c006': Role.Initiator, // Breach
  '22697a3d-45bf-8dd7-4fec-84a9e28c69d7': Role.Initiator, // Gekko
  'add6443a-41bd-e414-f6ad-e58d267f4e95': Role.Initiator, // Sova

  // Controllers
  '117ed9e3-49f3-6512-3ccf-0cada7e3823b': Role.Controller, // Cypher
  '41fb69c1-4189-7b37-f117-bcaf1e96f1bf': Role.Controller, // Astra
  '0e38b510-41a8-5780-5e8f-568b2a4f2d6c': Role.Controller, // Brimstone
  '1dbf2edd-4729-0984-3115-daa5eed44993': Role.Controller, // Clove
  '8e253930-4c05-31dd-1b6c-968525494517': Role.Controller, // Omen

  // Sentinels
  '569fdd95-4d10-43ab-ca70-79becc718b46': Role.Sentinel, // Sage
  'f0767e9c-4527-b3a0-0b7f-e4bd7db9cba4': Role.Sentinel, // Skye (re-check)
  'cc8b64c8-4b25-4ff9-6e7f-37b4da43d235': Role.Sentinel, // Chamber
  '6f2a04ca-43e0-be17-7f36-b3908627744d': Role.Sentinel, // Vyse
  'e370fa57-4757-3604-3648-499e1f642d3f': Role.Sentinel, // Deadlock
};

export function classifyRole(agentId: string): Role {
  return AGENT_ROLE_MAP[agentId] ?? Role.Duelist; // default fallback
}