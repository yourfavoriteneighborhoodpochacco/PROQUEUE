import { Role } from '@proqueue/shared/enums/role';

const AGENT_ROLE_MAP: Record<string, Role> = {
  // Duelists
  'Jett': Role.Duelist,
  'Reyna': Role.Duelist,
  'Phoenix': Role.Duelist,
  'Neon': Role.Duelist,
  'Iso': Role.Duelist,
  'Waylay': Role.Duelist,
  'Yoru': Role.Duelist,
  'Raze': Role.Duelist,

  // Initiators
  'Sova': Role.Initiator,
  'Breach': Role.Initiator,
  'Skye': Role.Initiator,
  'KAY/O': Role.Initiator,
  'Fade': Role.Initiator,
  'Gekko': Role.Initiator,
  'Tejo': Role.Initiator,

  // Controllers
  'Brimstone': Role.Controller,
  'Viper': Role.Controller,
  'Omen': Role.Controller,
  'Astra': Role.Controller,
  'Harbor': Role.Controller,
  'Clove': Role.Controller,
  'Miks': Role.Controller,

  // Sentinels
  'Killjoy': Role.Sentinel,
  'Cypher': Role.Sentinel,
  'Sage': Role.Sentinel,
  'Chamber': Role.Sentinel,
  'Deadlock': Role.Sentinel,
  'Vyse': Role.Sentinel,
  'Veto': Role.Sentinel,
};

export function classifyRole(agentName: string): Role {
  return AGENT_ROLE_MAP[agentName] ?? Role.Duelist;
}