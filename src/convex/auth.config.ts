const disableAdmin =
	process.env.DISABLE_ADMIN === '1' || process.env.DISABLE_ADMIN === 'true';

const clientId = process.env.WORKOS_CLIENT_ID;

const authConfig = disableAdmin
	? { providers: [] }
	: {
			providers: [
				{
					type: 'customJwt',
					issuer: 'https://api.workos.com',
					algorithm: 'RS256',
					applicationID: clientId,
					jwks: `https://api.workos.com/sso/jwks/${clientId}`
				},
				{
					type: 'customJwt',
					issuer: `https://api.workos.com/user_management/${clientId}`,
					algorithm: 'RS256',
					jwks: `https://api.workos.com/sso/jwks/${clientId}`,
					applicationID: clientId
				}
			]
		};

export default authConfig;
