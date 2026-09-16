<script lang="ts">
  import "../app.css";

  let { children } = $props();

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Reold",
    alternateName: "reold",
    url: "https://reold.github.io/",
    description: "A little software studio solving everyday problems"
  };
  const jsonLd = JSON.stringify(schema);
</script>

<svelte:head>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <title>Reold — A little software studio solving everyday problems</title>
  <meta name="description" content="A little software studio solving everyday problems" />
  <link rel="canonical" href="https://reold.github.io/" />
  <meta property="og:site_name" content="Reold" />
  <meta property="og:title" content="Reold — A little software studio solving everyday problems" />
  <meta property="og:description" content="A little software studio solving everyday problems" />
  <meta property="og:url" content="https://reold.github.io/" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://reold.github.io/favicon.svg" />
  <meta name="google-site-verification" content="vIh7FYUKVkBGh-zGGS1P7D55umQukT1QcoG5TYQ-TFc" />
  {@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

{@render children()}
