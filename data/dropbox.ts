import * as AuthSession from "expo-auth-session";
import { v4 as uuidv4 } from 'uuid';

const CLIENT_ID = "bhlkg1w8gtslyf6";
const AUTH_URL = "https://www.dropbox.com/oauth2/authorize";
const TOKEN_URL = "https://api.dropboxapi.com/oauth2/token";
const SCOPES = "files.content.write sharing.write";


async function loginDropbox() {
    const redirectUri = AuthSession.makeRedirectUri({});
    const authReq = new AuthSession.AuthRequest({
      clientId: CLIENT_ID,
      redirectUri,
      scopes: SCOPES.split(" "),
      responseType: AuthSession.ResponseType.Code,
      usePKCE: true,
    });
    const result = await authReq.promptAsync({ authorizationEndpoint: AUTH_URL });
    if (result.type === "success" && result.params.code) {
      const tokenRes = await AuthSession.exchangeCodeAsync(
        { code: result.params.code, clientId: CLIENT_ID, redirectUri },
        { tokenEndpoint: TOKEN_URL }
      );
      return tokenRes.accessToken;
    }
    return null;
  }

  export async function uploadImg(uri : string) {
    const token = await loginDropbox();
    const bytes = await fetch(uri).then(r => r.arrayBuffer());
    const fileName = `${uuidv4()}.jpg`;


    await fetch("https://content.dropboxapi.com/2/files/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/octet-stream",
        "Dropbox-API-Arg": JSON.stringify({ path: `/${fileName}`, mode: "add", autorename: true }),
      },
      body: bytes,
    });

    const linkRes = await fetch("https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ path: `/${fileName}`, settings: { requested_visibility: "public" } }),
    });
    const linkData = await linkRes.json();
    return linkData.url.replace("?dl=0", "?raw=1");
  }
