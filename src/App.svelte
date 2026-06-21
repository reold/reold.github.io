<script lang="ts">
  import StashLogo from "./assets/stash-logo.png";
  import CartierLogo from "./assets/cartier-logo.svg";
  import SvaraLogo from "./assets/svara-logo.svg";
  import REVMLogo from "./assets/revm-logo.svg";
  import GoogleSignin from "./lib/GoogleSignin.svelte";
  import { onMount } from "svelte";

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

  let products: Record<
    string,
    {
      desc: string;
      url: string;
      img: string;
      type: string;
    }
  > = {};

  onMount(async () => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/reold/reold.github.io/refs/heads/code/data.json",
      );
      const data = await res.json();
      if (data?.products) {
        products = data.products;
      }
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  });
</script>

<div class="snap-y snap-mandatory font-mono bg-black text-white">
  <div
    class="snap-start w-screen h-[60dvh] sm:h-[75dvh] flex flex-col items-center justify-center select-none"
  >
    <div class="flex flex-row items-center justify-center">
      <svg
        class="aspect-square w-[75px] sm:w-[150px]"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_3022_33)">
          <circle cx="50" cy="50" r="50" fill="white" />
          <path
            d="M16 29.3478L49.1707 12V24.3913L29.2683 35.9565V64.0435L49.1707 73.9565V88L16 69.8261V29.3478Z"
            fill="#FF8700"
          />
          <path
            d="M16 29.3478L49.1707 12V24.3913L29.2683 35.9565V64.0435L49.1707 73.9565V88L16 69.8261V29.3478Z"
            fill="#FF8700"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M65.3415 36.3696L50 26.8696V44.2174L65.3415 36.3696Z"
            fill="#FF8700"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M65.3415 36.3696L50 26.8696V44.2174L65.3415 36.3696Z"
            fill="#FF8700"
          />
          <path
            d="M50.8293 12V24.3913L70.7317 35.9565V64.0435L50.8293 73.9565V88L84 69.8261V29.3478L50.8293 12Z"
            fill="#FF8700"
          />
          <path
            d="M50.8293 12V24.3913L70.7317 35.9565V64.0435L50.8293 73.9565V88L84 69.8261V29.3478L50.8293 12Z"
            fill="#32424F"
          />
          <path
            d="M50 26.8696L34.6585 36.3696L50 44.2174V26.8696Z"
            fill="#FF8700"
          />
          <path
            d="M50 26.8696L34.6585 36.3696L50 44.2174V26.8696Z"
            fill="#32424F"
          />
        </g>
        <defs>
          <clipPath id="clip0_3022_33">
            <rect width="100" height="100" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <h1
        class="font-medium text-[75px] sm:text-[150px] pl-2 heading transition-all duration-100"
      >
        reold
      </h1>
    </div>
    <p class="-mt-2 sm:-mt-10 mb-10 text-xl sm:text-3xl">software studio</p>
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
    <!-- <GoogleSignin /> -->
  </div>
  <div
    class="pt-10 sm:pt-5 snap-end w-screen min-h-screen flex flex-col items-center justify-center border-t-[1px] border-white/20"
  >
    <h1
      class="flex flex-row items-center justify-center space-x-2 transition-all duration-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-10 sm:size-20 inline-block p-0 m-0"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
        />
      </svg>
      <span class="inline-block text-[40px] sm:text-[80px]">products</span>
    </h1>
    <p class="-mt-2 sm:-mt-2 mb-10 text-lg sm:text-2xl">
      public releases from reold
    </p>
    <div
      class="grid grid-cols-2 sm:grid-cols-3 items-start gap-4 p-2 overflow-clip"
    >
      {#each Object.entries(products) as [name, config]}
        <button
          class="max-h-[60dvh] bg-white/5 p-2 rounded-md max-w-[30ch] flex flex-col items-center justify-center hover:scale-110 transition-all duration-75"
        >
          <a href={config.url} target="_blank">
            <img
              src={config.img}
              alt={`${name}'s logo`}
              class="bg-white/5 rounded-md max-w-[100%] max-h-[50dvh]"
              loading="lazy"
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
      {:else}
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          class="size-10 text-white stroke-white col-span-2"
          ><g
            ><circle
              cx="12"
              cy="12"
              r="9.5"
              fill="none"
              stroke-width="3"
              stroke-linecap="round"
              ><animate
                attributeName="stroke-dasharray"
                dur="1.5s"
                calcMode="spline"
                values="0 150;42 150;42 150;42 150"
                keyTimes="0;0.475;0.95;1"
                keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                repeatCount="indefinite"
              /><animate
                attributeName="stroke-dashoffset"
                dur="1.5s"
                calcMode="spline"
                values="0;-16;-59;-59"
                keyTimes="0;0.475;0.95;1"
                keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                repeatCount="indefinite"
              /></circle
            ><animateTransform
              attributeName="transform"
              type="rotate"
              dur="2s"
              values="0 12 12;360 12 12"
              repeatCount="indefinite"
            /></g
          ></svg
        >
      {/each}
    </div>
  </div>
</div>

<style>
  .heading:hover {
    text-shadow: 0px 5px 0px rgba(255, 0, 127.5, 1);
  }
</style>
