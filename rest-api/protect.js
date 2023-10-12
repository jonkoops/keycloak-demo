import { createRemoteJWKSet, jwtVerify } from "jose";

const AUTH_SERVER_URL = "http://localhost:8180";
const REALM_NAME = "master";
const CLIENT_ID = "todo-list";

export const jwks = createRemoteJWKSet(
  new URL(
    `${AUTH_SERVER_URL}/realms/${REALM_NAME}/protocol/openid-connect/certs`
  )
);

export function protect(...requiredRoles) {
  return async function handleProtection(req, res, next) {
    const token = extractTokenFromHeader(req);

    if (!token) {
      return res.status(401).end();
    }

    let payload;

    try {
      const result = await jwtVerify(token, jwks);
      payload = result.payload;
    } catch (err) {
      return res.status(401).end();
    }

    if (requiredRoles.length === 0) {
      return next();
    }

    const { roles } = payload.resource_access[CLIENT_ID];
    const hasAccess = requiredRoles.every((requiredRole) =>
      roles.includes(requiredRole)
    );

    if (!hasAccess) {
      return res.status(401).end();
    }

    next();
  };
}

function extractTokenFromHeader(req) {
  const [type, token] = req.headers.authorization?.split(" ") ?? [];
  return type === "Bearer" ? token : undefined;
}
