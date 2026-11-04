import { execFileSync } from 'node:child_process';
import { mkdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const pending = execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim();
if (pending) throw new Error('Registre as alterações em commits antes de gerar a entrega.');

const tracked = execFileSync('git', ['ls-tree', '-r', '--name-only', 'HEAD'], {
  encoding: 'utf8',
}).split('\n');
for (const file of [
  'package.json',
  'package-lock.json',
  'README.md',
  'vite.config.ts',
  'tsconfig.json',
  'src/main.tsx',
  'src/styles.css',
  'public/robots.txt',
]) {
  if (!tracked.includes(file)) throw new Error(`Arquivo obrigatório ausente: ${file}`);
}
if (tracked.some((file) => file.startsWith('node_modules/')))
  throw new Error('node_modules não pode integrar a entrega.');

mkdirSync('entregas', { recursive: true });
const destination = resolve('entregas', 'alpha4-frontend.zip');
execFileSync('git', ['archive', '--format=zip', '--output', destination, 'HEAD']);
const bytes = statSync(destination).size;
if (bytes > 50_000_000) throw new Error('O ZIP excede o limite de 50 MB.');
console.log(`ZIP criado: ${destination} (${(bytes / 1_000_000).toFixed(2)} MB).`);
console.log(
  'Verifique os links de deploy, API e vídeo no README antes de enviar pelo Portal do Aluno.',
);
