import { MatchDTO } from '../../types/MatchDTO';
import { Role } from '@proqueue/shared/enums/role';
import './RoleBreakdown.css';

interface RoleBreakdownProps {
  matches: MatchDTO[];
}

const ROLE_LABELS: Record<Role, string> = {
  [Role.Duelist]: 'Duelist',
  [Role.Initiator]: 'Initiator',
  [Role.Controller]: 'Controller',
  [Role.Sentinel]: 'Sentinel',
};

export function RoleBreakdown({ matches }: RoleBreakdownProps) {
  const byRole = Object.values(Role).map((role) => {
    const roleMatches = matches.filter((m) => m.role === role);
    const avg = roleMatches.length
      ? roleMatches.reduce((sum, m) => sum + Number(m.impactNormalized), 0) / roleMatches.length
      : null;
    return { role, avg, count: roleMatches.length };
  }).filter((r) => r.count > 0);

  const maxAbs = Math.max(...byRole.map((r) => Math.abs(r.avg ?? 0)), 1);

  return (
    <div className="role-breakdown">
      <div className="role-breakdown-eyebrow">Role Breakdown</div>
      {byRole.length === 0 ? (
        <p className="role-empty">No role data</p>
      ) : (
        <div className="role-list">
          {byRole.map(({ role, avg, count }) => {
            const width = avg !== null ? (Math.abs(avg) / maxAbs) * 100 : 0;
            const color = avg !== null && avg >= 0 ? 'var(--win)' : 'var(--loss)';
            return (
              <div key={role} className="role-row">
                <div className="role-row-header">
                  <span className="role-name">{ROLE_LABELS[role]}</span>
                  <span className="role-count">{count}G</span>
                  <span className="role-score" style={{ color }}>
                    {avg !== null ? (avg >= 0 ? '+' : '') + avg.toFixed(2) : '—'}
                  </span>
                </div>
                <div className="role-bar-track">
                  <div className="role-bar-fill" style={{ width: `${width}%`, background: color }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}