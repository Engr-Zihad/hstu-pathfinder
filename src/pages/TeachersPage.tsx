import React from 'react';
import { teachers } from '@/constants/teachers';
import { Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const designationColors: Record<string, string> = {
  chairman: 'from-purple-500 to-pink-500',
  dean: 'from-blue-500 to-purple-500',
  faculty: 'from-cyan-500 to-blue-500',
};

const designationBadge: Record<string, string> = {
  chairman: 'bg-purple-500/20 text-purple-400',
  dean: 'bg-blue-500/20 text-blue-400',
  faculty: 'bg-cyan-500/20 text-cyan-400',
};

export default function TeachersPage() {
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    const parts = name.replace(/Dr\.|Prof\.|Md\.|U\.A\./g, '').trim().split(' ');
    return parts.filter(p => p.length > 1).slice(0, 2).map(p => p[0]).join('').toUpperCase();
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-heading font-bold text-xl text-[--text-1] mb-1">👨‍🏫 CSE Department Faculty</h1>
        <p className="text-sm text-[--text-2] mb-6">HSTU — Computer Science & Engineering Department</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teachers.map(teacher => (
            <div key={teacher.id} className="glass-card rounded-2xl p-5 hover:bg-white/[0.07] transition-all">
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${designationColors[teacher.role] || designationColors.faculty} flex items-center justify-center shrink-0`}>
                  <span className="text-white font-bold text-sm">{getInitials(teacher.name)}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-sm text-[--text-1] leading-snug">{teacher.name}</h3>
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium mt-1 ${designationBadge[teacher.role] || designationBadge.faculty}`}>
                    {teacher.designation}
                  </span>
                </div>
              </div>

              <div className="mt-3 space-y-1.5">
                <a href={`mailto:${teacher.email}`} className="flex items-center gap-2 text-xs text-[--text-2] hover:text-blue-400 truncate">
                  <Mail className="w-3.5 h-3.5 shrink-0" /> {teacher.email}
                </a>
                {teacher.phone && (
                  <a href={`tel:${teacher.phone}`} className="flex items-center gap-2 text-xs text-[--text-2] hover:text-blue-400">
                    <Phone className="w-3.5 h-3.5 shrink-0" /> {teacher.phone}
                  </a>
                )}
                {teacher.research && (
                  <p className="text-[10px] text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded inline-block mt-1">
                    🔬 {teacher.research}
                  </p>
                )}
              </div>

              <div className="mt-3 flex gap-2">
                <a href={`mailto:${teacher.email}`}
                  className="flex-1 text-center py-1.5 rounded-lg text-[10px] font-medium bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all">
                  📧 Email
                </a>
                <button onClick={() => navigate('/chat')}
                  className="flex-1 text-center py-1.5 rounded-lg text-[10px] font-medium bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-all">
                  🤖 Ask AI
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <a href="https://hstu.ac.bd/dept/cse" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 transition-all">
            🌐 Visit CSE Department Website
          </a>
        </div>
      </div>
    </div>
  );
}
