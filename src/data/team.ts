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
    photoUrl: '/images/team/vinicius.jpg',
    githubUrl: 'https://github.com/Vinicius-0lvr',
    linkedinUrl: 'https://www.linkedin.com/in/vinicius-oliveira-101137252/',
  },
  {
    name: 'Robison Custodio Junior',
    rm: '572866',
    className: '1TDSPW',
    email: 'rm572866@fiap.com.br',
    photoUrl: '/images/team/junior.jpeg',
    githubUrl: 'https://github.com/Junior4744',
    linkedinUrl: 'https://www.linkedin.com/in/robinson-custodio-junior/',
  },
  {
    name: 'Lucas Fernando Silva',
    rm: '564848',
    className: '1TDSPW',
    email: 'rm564848@fiap.com.br',
    photoUrl: '/images/team/lucas.jpeg',
    githubUrl: 'https://github.com/lucas-silva8077',
    linkedinUrl: 'https://www.linkedin.com/in/lucas-fernando-5aa8b6193/',
  },
  {
    name: 'Thiago Shimizu Sodré dos Santos',
    rm: '572867',
    className: '1TDSPW',
    email: 'rm572867@fiap.com.br',
    photoUrl: '/images/team/thiago.jpeg',
    githubUrl: 'https://github.com/thssd',
    linkedinUrl: 'https://www.linkedin.com/in/thiagoshimizusodre/',
  },
  {
    name: 'Arthur Mendes Garcia',
    rm: '571703',
    className: '1TDSPW',
    email: 'rm571703@fiap.com.br',
    photoUrl: '/images/team/arthur.jpeg',
    githubUrl: 'https://github.com/proc0x41',
    linkedinUrl: 'https://www.linkedin.com/in/arthur-mendes-garcia/',
  },
];
