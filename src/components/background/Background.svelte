<script lang="ts">
  import { useLocation } from "svelte-navigator";
  import { isGameInstalled } from "$lib/rpc/config";
  import { onMount } from "svelte";
  import { listen } from "@tauri-apps/api/event";
  import { getFurthestGameMilestone } from "$lib/rpc/game";
  import jak2Background from "$assets/images/background-jak2.webp";

  const location = useLocation();
  $: $location.pathname, updateStyle();

  let style = "absolute object-fill h-screen brightness-75";
  let jak1Image = "";

  onMount(async () => {
    const unlistenInstalled = await listen("gameInstalled", (event) => {
      updateStyle();
    });
    const unlistenUninstalled = await listen("gameUninstalled", (event) => {
      updateStyle();
    });
    // TODO - call this if the game is closed as well
    const jak1_milestone = await getFurthestGameMilestone("jak1");
    jak1Image = `/images/jak1/${jak1_milestone}.jpg`;
  });

  async function updateStyle(): Promise<void> {
    let newStyle = "absolute object-fill h-screen brightness-75";
    let pathname = $location.pathname;
    if (pathname === "/jak1" || pathname === "/") {
      if (!(await isGameInstalled("jak1"))) {
        newStyle += " grayscale";
      }
    } else if (pathname === "/jak2") {
      if (!(await isGameInstalled("jak2"))) {
        newStyle += " grayscale";
      }
    } else if (pathname === "/jak3") {
      if (!(await isGameInstalled("jak3"))) {
        newStyle += " grayscale";
      }
    } else if (pathname === "/jakx") {
      if (!(await isGameInstalled("jakx"))) {
        newStyle += " grayscale";
      }
    }
    style = newStyle;
  }
</script>

{#if $location.pathname == "/jak1" || $location.pathname == "/"}
  <img class={style} src={jak1Image} />
{:else if $location.pathname == "/jak2"}
  <img class={style} src={jak2Background} />
{/if}
