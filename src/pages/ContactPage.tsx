import { useState } from 'react';
import { teamMembers } from '../data/team';

export function ContactPage() {
  const [selectedRm, setSelectedRm] = useState(teamMembers[0].rm);
  const [subject, setSubject] = useState('Contato sobre o projeto Alpha4');
  const [message, setMessage] = useState('');
  const recipient =
    teamMembers.find((member) => member.rm === selectedRm) ?? teamMembers[0];
  const emailLink = `mailto:${recipient.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

  return (
    <div className="space-y-8">
      <header className="max-w-3xl space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-[#111c3d] sm:text-4xl">
          Fale com a Alpha4
        </h1>
        <p className="text-base leading-7 text-slate-600 sm:text-lg">
          Tem uma dúvida ou sugestão sobre o projeto? Escolha um integrante e
          prepare uma mensagem para a equipe.
        </p>
      </header>

      <section aria-labelledby="contact-title" className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 id="contact-title" className="text-2xl font-bold text-[#111c3d]">Prepare seu e-mail</h2>
        <p id="email-help" className="mt-3 leading-7 text-slate-600">
          O botão abre seu aplicativo de e-mail com o texto preenchido. Revise e
          envie a mensagem por lá. O site não envia nem armazena este contato.
        </p>

        <div className="mt-6 space-y-5">
          <div>
            <label className="block font-semibold text-[#111c3d]" htmlFor="contact-recipient">
              Integrante
            </label>
            <select
              className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-[#111c3d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087f68]"
              id="contact-recipient"
              name="recipient"
              value={selectedRm}
              onChange={(event) => setSelectedRm(event.target.value)}
            >
              {teamMembers.map((member) => (
                <option key={member.rm} value={member.rm}>
                  {member.name}
                </option>
              ))}
            </select>
            <p className="mt-2 break-all text-sm text-slate-600">Destinatário: {recipient.email}</p>
          </div>

          <div>
            <label className="block font-semibold text-[#111c3d]" htmlFor="contact-subject">
              Assunto
            </label>
            <input
              className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-[#111c3d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087f68]"
              id="contact-subject"
              name="subject"
              type="text"
              maxLength={150}
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            />
          </div>

          <div>
            <label className="block font-semibold text-[#111c3d]" htmlFor="contact-message">
              Mensagem
            </label>
            <textarea
              className="mt-2 min-h-40 w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-3 text-[#111c3d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087f68]"
              id="contact-message"
              name="message"
              rows={6}
              maxLength={1500}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              aria-describedby="email-help message-help"
            />
            <p id="message-help" className="mt-2 text-sm text-slate-600">Até 1.500 caracteres.</p>
          </div>

          <a
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#087f68] px-5 py-3 text-center font-semibold text-white hover:bg-[#066653] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f68]"
            href={emailLink}
            aria-describedby="email-help"
          >
            Abrir aplicativo de e-mail
          </a>
          <p className="text-sm leading-6 text-slate-600">
            Se o aplicativo não abrir, escreva diretamente para{' '}
            <a
              className="break-all font-semibold text-[#087f68] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f68]"
              href={`mailto:${recipient.email}`}
            >
              {recipient.email}
            </a>.
          </p>
        </div>
      </section>
    </div>
  );
}
