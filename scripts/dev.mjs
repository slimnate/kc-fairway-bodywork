import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const noAdmin = process.argv.includes('--no-admin');
const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const env = { ...process.env };
if (noAdmin) {
	env.DISABLE_ADMIN = '1';
	env.PUBLIC_ADMIN_ENABLED = 'false';
	console.log('Admin features disabled (--no-admin). WorkOS auth is not required.');
}

const child = spawn('npx', ['concurrently', 'npx convex dev', 'vite dev'], {
	cwd: projectRoot,
	env,
	stdio: 'inherit'
});

child.on('exit', (code, signal) => {
	if (signal) process.kill(process.pid, signal);
	process.exit(code ?? 1);
});
