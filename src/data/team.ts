export interface TeamMember {
  name: string;
  rm: string;
  className: string;
  email: string;
  photoUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export const teamMembers: [TeamMember, ...TeamMember[]] = [
  {
    name: 'Vinicius de Oliveira',
    rm: '561862',
    className: '1TDSPW',
    email: 'rm561862@fiap.com.br',
  },
  {
    name: 'Robison Custodio Junior',
    rm: '572866',
    className: '1TDSPW',
    email: 'rm572866@fiap.com.br',
  },
  {
    name: 'Lucas Fernando Silva',
    rm: '564848',
    className: '1TDSPW',
    email: 'rm564848@fiap.com.br',
  },
  {
    name: 'Thiago Shimizu Sodré dos Santos',
    rm: '572867',
    className: '1TDSPW',
    email: 'rm572867@fiap.com.br',
  },
  {
    name: 'Arthur Mendes Garcia',
    rm: '571703',
    className: '1TDSPW',
    email: 'rm571703@fiap.com.br',
  },
];
