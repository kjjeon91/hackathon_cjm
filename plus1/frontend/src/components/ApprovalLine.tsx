import { cn } from '@/lib/utils';

interface ApprovalNode {
  label: string;   // 역할 (예: '부서장')
  name: string;    // 이름 (예: '최흥배 부서장')
  step: string;    // 단계 라벨 (예: '1차')
  status: 'done' | 'active' | 'pending';
  initial: string; // 아바타 이니셜
}

interface ApprovalLineProps {
  nodes: ApprovalNode[];
  className?: string;
}

const statusStyles = {
  done: {
    ring: 'ring-2 ring-green',
    bg: 'bg-green/10',
    text: 'text-green',
    dot: 'bg-green',
    badge: 'bg-green/10 text-green',
    badgeLabel: '완료',
  },
  active: {
    ring: 'ring-2 ring-blue shadow-[0_0_0_4px_rgba(37,99,235,0.12)]',
    bg: 'bg-gradient-to-br from-navy to-blue',
    text: 'text-white',
    dot: 'bg-blue animate-pulse',
    badge: 'bg-blue/10 text-blue',
    badgeLabel: '검토 중',
  },
  pending: {
    ring: 'ring-1 ring-line',
    bg: 'bg-canvas',
    text: 'text-muted',
    dot: 'bg-line',
    badge: 'bg-canvas text-muted ring-1 ring-line',
    badgeLabel: '대기',
  },
};

function ApprovalNode({ node, isLast }: { node: ApprovalNode; isLast: boolean }) {
  const s = statusStyles[node.status];

  return (
    <li className="flex flex-1 items-center min-w-0">
      {/* 노드 */}
      <div className="flex flex-col items-center gap-1.5 min-w-0 flex-1">
        {/* 단계 라벨 */}
        <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide', s.badge)}>
          {node.step}
        </span>

        {/* 원형 아바타 */}
        <div
          className={cn(
            'flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-base font-extrabold transition-all',
            s.ring,
            s.bg,
            s.text,
          )}
          aria-label={`${node.step} ${node.label}`}
        >
          {node.status === 'done' ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            node.initial
          )}
        </div>

        {/* 이름·역할 */}
        <div className="text-center min-w-0 px-1">
          <p className="text-xs font-bold text-navy truncate leading-snug">{node.label}</p>
          <p className="text-[11px] text-muted truncate leading-snug">{node.name}</p>
        </div>

        {/* 상태 점 */}
        <span className={cn('h-2 w-2 rounded-full', s.dot)} aria-hidden />
      </div>

      {/* 연결선 */}
      {!isLast && (
        <div className="flex items-center px-1 pb-8 shrink-0" aria-hidden>
          <div className="flex items-center gap-0.5">
            <div className="h-px w-6 bg-line sm:w-8" />
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-muted shrink-0">
              <path d="M3 2l4 3-4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      )}
    </li>
  );
}

export function ApprovalLine({ nodes, className }: ApprovalLineProps) {
  return (
    <div className={cn('rounded-2xl border border-blue/20 bg-blue/5 px-5 py-4', className)}>
      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-blue">결재 라인</p>
      <ol className="flex items-start justify-between gap-0 overflow-x-auto" role="list">
        {nodes.map((node, i) => (
          <ApprovalNode key={node.step} node={node} isLast={i === nodes.length - 1} />
        ))}
      </ol>
    </div>
  );
}
