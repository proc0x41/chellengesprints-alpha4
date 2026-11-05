import { teamMembers } from '../data/team';

export function TeamPage() {
  return (
    <div className="space-y-8">
      <header className="max-w-3xl space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-[#111c3d] sm:text-4xl">
          Somos a Alpha4
        </h1>
        <p className="text-base leading-7 text-slate-600 sm:text-lg">
          Cinco integrantes da turma 1TDSPW da FIAP, conectados pela proposta de transformar hábitos
          sustentáveis em uma experiência coletiva.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {teamMembers.map((member) => (
          <article
            key={member.rm}
            className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-6"
          >
            {member.photoUrl ? (
              <img
                className="mb-5 h-24 w-24 rounded-2xl object-cover"
                src={member.photoUrl}
                alt={`Foto de ${member.name}`}
                width={96}
                height={96}
                loading="lazy"
              />
            ) : (
              <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-2xl bg-[#f4f6fb] p-3 text-center text-sm leading-5 text-slate-600">
                Foto não fornecida
              </div>
            )}
            <h2 className="text-xl font-bold text-[#111c3d]">{member.name}</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex gap-2">
                <dt className="font-semibold text-[#111c3d]">RM</dt>
                <dd className="text-slate-600">{member.rm}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold text-[#111c3d]">Turma</dt>
                <dd className="text-slate-600">{member.className}</dd>
              </div>
            </dl>
            <a
              className="mt-4 break-all text-sm font-semibold text-[#087f68] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f68]"
              href={`mailto:${member.email}`}
            >
              {member.email}
            </a>
            <div className="mt-5 flex flex-1 flex-col justify-end gap-3 text-sm">
              {member.githubUrl ? (
                <a
                  className="font-semibold text-[#087f68] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f68]"
                  href={member.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub de {member.name} (nova aba)
                </a>
              ) : (
                <p className="text-slate-600">GitHub: perfil não informado</p>
              )}
              {member.linkedinUrl ? (
                <a
                  className="font-semibold text-[#087f68] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f68]"
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn de {member.name} (nova aba)
                </a>
              ) : (
                <p className="text-slate-600">LinkedIn: perfil não informado</p>
              )}
            </div>
          </article>
        ))}
      </div>

      <p className="max-w-3xl text-sm leading-6 text-slate-600">
        Nomes, RMs e turma seguem o documento da Alpha4 da Sprint 3. As fotos foram fornecidas pela
        equipe no frontend da Sprint 3.
      </p>
    </div>
  );
}
