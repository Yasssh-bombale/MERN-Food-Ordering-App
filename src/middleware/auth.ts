import { auth } from "express-oauth2-jwt-bearer";

export const jwtCheck = auth({
  audience: "mern-food-ordering-app-api",
  issuerBaseURL: "https://dev-caduw53ujxaqbg0n.us.auth0.com/",
  tokenSigningAlg: "RS256",
});
