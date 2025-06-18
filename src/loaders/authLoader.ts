import { reissue } from "@/common/api/reissue";
import { accessTokenStore } from "@/common/stores/accessTokenStore";
import { redirect } from "react-router";

export async function authLoader() {
  try {
    const { data } = await reissue();
    accessTokenStore.set(data.accessToken);
    return null;
  } catch (e) {
    return redirect("/login");
  }
}
