import "./main.css";

import { createRoot } from "react-dom/client";
import App from "./App.js";
import { keycloak } from "./auth.js";

const container = document.getElementById("root");
const root = createRoot(container!);

const authenticated = await keycloak.init({
  onLoad: 'check-sso',
  silentCheckSsoRedirectUri: location.origin + '/silent-authentication.html',
  enableLogging: true
})

if (!authenticated) {
  await keycloak.login();
}

root.render(<App />);
