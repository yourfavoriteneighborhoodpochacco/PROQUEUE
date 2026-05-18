import { MatchDTO } from '../../types/MatchDTO';
import { Role } from '@proqueue/shared/enums/role';

interface RoleBreakdownProps {
  matches: MatchDTO[];
}

export function RoleBreakdown({ matches }: RoleBreakdownProps) {
  const byRole = Object.values(Role).map((role) => {
    const roleMatches = matches.filter((m) => m.role === role);
    const avg = roleMatches.length
      ? roleMatches.reduce((sum, m) => sum + m.impactNormalized, 0) /
        roleMatches.length
      : null;
    return { role, avg, count: roleMatches.length };
  });

  return (
    <div>
      <h3>Role Breakdown</h3>
      {byRole.map(({ role, avg, count }) => (
        <div key={role}>
          <span>{role}</span>
          <span>{count > 0 ? avg?.toFixed(2) : 'No data'}</span>
        </div>
      ))}
    </div>
  );
}