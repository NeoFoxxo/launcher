import { invoke } from "@tauri-apps/api/tauri";
import { exceptionLog } from "./logging";

export async function openDir(dir: string): Promise<void> {
  try {
    return await invoke("open_dir", { dir });
  } catch (e) {
    exceptionLog(`Unable to get open directory - ${dir}`, e);
  }
}
