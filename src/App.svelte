<script lang="ts">
  import StashLogo from "./assets/stash-logo.png";
  import CartierLogo from "./assets/cartier-logo.svg";
  import SvaraLogo from "./assets/svara-logo.svg";
  import REVMLogo from "./assets/revm-logo.svg";
  import GoogleSignin from "./lib/GoogleSignin.svelte";

  let socials = {
    GitHub: {
      color: "#FFFFFF",
      svg: '<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>',
      url: "https://github.com/reold",
    },
    X: {
      color: "#FFFFFF",
      svg: '<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>',
      url: "https://twitter.com/redicrafty",
    },
    YouTube: {
      color: "#FF0000",
      svg: '<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>',
      url: "https://www.youtube.com/@reold",
    },
  };

  enum ProductType {
    GAME = "game",
    APP = "app",
  }

  let products = {
    Svara: {
      desc: "Advanced mobile music player, with multi-library support",
      url: "https://reold.github.io/svara",
      img: SvaraLogo,
      type: ProductType.APP,
    },
    Stash: {
      desc: "Fun and frantic card game, inspired by the classic UNO",
      url: "https://reold.github.io/stash",
      img: StashLogo,
      type: ProductType.GAME,
    },
    Cartier: {
      desc: "Mobile friendly, free to use Spotify playlist downloader",
      url: "https://reold.github.io/cartier",
      img: CartierLogo,
      type: ProductType.APP,
    },
    "Reold's Voting Machine": {
      desc: "A simple voting machine configurator app that works with all Reold built EVMs",
      url: "https://reold.github.io/revm",
      img: REVMLogo,
      type: ProductType.APP,
    },
  };
</script>

<div class="snap-y snap-mandatory font-mono bg-black text-white">
  <div
    class="snap-start w-screen h-[60dvh] sm:h-[75dvh] flex flex-col items-center justify-center select-none"
  >
    <h1
      class="text-[120px] sm:text-[200px] heading transition-all duration-100"
    >
      reold
    </h1>
    <p class="-mt-8 sm:-mt-14 mb-10">software & studio</p>
    <div
      class="flex flex-row items-center space-x-[2em] max-h-[10dvh] overflow-y-scroll mb-2"
    >
      {#each Object.entries(socials) as [name, config]}
        <button class="h-[4em]">
          <a href={config.url} target="_blank">
            <svg
              role="img"
              viewBox="0 0 24 24"
              class="w-[3em] brightness-75 hover:brightness-150 hover:size-[4em] transition-all duration-100"
              fill={config.color}
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>reold's {name}</title>
              {@html config.svg}
            </svg></a
          ></button
        >
      {/each}
    </div>
    <GoogleSignin />
  </div>
  <div
    class="snap-end w-screen min-h-screen flex flex-col items-center justify-center border-t-[1px] border-white/20"
  >
    <h1
      class="text-[50px] sm-text-[100px] heading-products transition-all duration-100"
    >
      products
    </h1>
    <p class="-mt-2 sm:-mt-5 mb-10">public releases from reold</p>
    <div class="grid grid-cols-2 sm:grid-cols-3 items-center gap-1 p-1">
      {#each Object.entries(products) as [name, config]}
        <button
          class="max-h-[60dvh] bg-white/5 p-2 rounded-md max-w-[30ch] flex flex-col items-center justify-center hover:scale-110 transition-all duration-75"
        >
          <a href={config.url} target="_blank">
            <img
              src={config.img}
              alt={`${name}'s logo`}
              class="bg-white/5 rounded-md max-w-[100%] max-h-[50dvh]"
            />
            <p class="inline font-bold text-xl">{name}:</p>

            <p class="inline text-ellipsis overflow-hidden">
              {config.desc}
            </p>
            <svg
              viewBox="0 0 100 100"
              class="w-[0.5em] inline fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle r="45" cx="50" cy="50" />
            </svg>
            <p class="inline">{config.type.toUpperCase()}</p>
          </a></button
        >
      {/each}
    </div>
  </div>
</div>

<style>
  .heading {
    text-shadow: 0px 5px 0px rgba(255, 0, 127.5, 1);
  }

  .heading:hover {
    text-shadow: 0px 10px 0px rgba(255, 0, 127.5, 1);
  }

  .heading-products {
    text-shadow: 0px 5px 0px rgba(255, 0, 127.5, 1);
  }
</style>
