<img src="public/logo.svg" width="72" alt="icon-marquee pixel heart logo" />

# icon-marquee

Scrolling marquees and static rows of tech icons, served as SVG. Drop one into a README, a portfolio or any page with a plain `<img>` tag.

[![icon marquee](https://icon-marquee.giann.dev/v1/marquee?i=js,ts,react,nextjs,svelte,vue,tailwind,bun,nodejs,docker,postgres,redis,go,rust,python)](https://icon-marquee.giann.dev/v1/marquee?i=js,ts,react,nextjs,svelte,vue,tailwind,bun,nodejs,docker,postgres,redis,go,rust,python)

Icons come from [skills-icons](https://github.com/syvixor/skills-icons). See [Credits](#credits).

## Quick start

Markdown:

```md
![my stack](https://icon-marquee.giann.dev/v1/marquee?i=js,ts,react,docker)
```

HTML:

```html
<img src="https://icon-marquee.giann.dev/v1/marquee?i=js,ts,react,docker" alt="my stack" />
```

## For AI agents

Agents and LLMs: read [`https://icon-marquee.giann.dev/llms.txt`](https://icon-marquee.giann.dev/llms.txt) before building URLs. It lists every endpoint, parameter, limit, short name and valid icon name in Markdown.

## Endpoints

| Endpoint | Returns |
| --- | --- |
| `GET /v1/marquee?i=…` | Animated SVG that scrolls the icons in a seamless loop |
| `GET /v1/icons?i=…` | Static SVG with the icons in a row |
| `GET /v1` | Health check: `{"status":"ok"}` |

### `/v1/marquee`

![marquee](https://icon-marquee.giann.dev/v1/marquee?i=html,css,js,ts,react,vue,svelte,angular)

```
https://icon-marquee.giann.dev/v1/marquee?i=html,css,js,ts,react,vue,svelte,angular
```

- The icons scroll left at a constant 30px/s (pass `direction=right` to flip it), so a longer list makes a longer loop. 8 icons loop every 15 seconds.
- The visible window is at most 400px wide. With fewer icons than fill 400px, the window shrinks to exactly one row and still loops.
- Pass `width` to set the window yourself, up to 3840px. The row repeats to fill it, so even a few icons can span a full-width banner.
- The animation stops for viewers who turn on reduced motion (`prefers-reduced-motion: reduce`).
- It's plain SVG with CSS animation: no JavaScript and no GIF. It stays sharp at any size and works inside `<img>`, including GitHub READMEs.

A wide banner, with three icons repeated to fill 800px:

![wide marquee](https://icon-marquee.giann.dev/v1/marquee?i=go,rust,zig&width=800)

```
https://icon-marquee.giann.dev/v1/marquee?i=go,rust,zig&width=800
```

Scrolling right:

![right marquee](https://icon-marquee.giann.dev/v1/marquee?i=go,rust,zig&direction=right)

```
https://icon-marquee.giann.dev/v1/marquee?i=go,rust,zig&direction=right
```

A short list:

![short marquee](https://icon-marquee.giann.dev/v1/marquee?i=go,rust,zig)

```
https://icon-marquee.giann.dev/v1/marquee?i=go,rust,zig
```

### `/v1/icons`

![icons](https://icon-marquee.giann.dev/v1/icons?i=js,html,css,wasm)

```
https://icon-marquee.giann.dev/v1/icons?i=js,html,css,wasm
```

The same icons in a static row, in the order you list them.

## Query parameters

| Param | Required | Description |
| --- | --- | --- |
| `i` | yes | Comma-separated icon names or short names, e.g. `i=js,ts,react` |
| `width` | no | `/v1/marquee` only. Window width in px, a whole number from 1 to 3840, e.g. `width=1200` |
| `direction` | no | `/v1/marquee` only. `left` (default) or `right` |

Behaviour of the `i` list:

- **Order** is kept: icons render left to right as listed.
- **Case and spaces** are ignored: `i=JS, TS` works.
- **Duplicates** are allowed: `i=js,js,js` renders three.
- **Limit:** at most 100 icons per request.
- **Unknown names** are skipped, so a typo costs one icon, not the whole image. The skipped names are listed in the `X-Unknown-Icons` response header. If no name is known, the request fails with 400.
- **Names:** use any icon name from the [full list](#available-icons) or a [short name](#short-names).

## Theme

Icons that have light and dark versions switch automatically with the viewer's system light/dark setting. Icons with one design always render the same. The [full list](#available-icons) marks themed icons with *.

![themed](https://icon-marquee.giann.dev/v1/icons?i=github,nextjs,vercel,bun,rust)

## Short names

| Short name | Icon |
| --- | --- |
| `access` | `microsoftaccess` |
| `acrobat` | `adobeacrobat` |
| `adianti` | `adiantiframework` |
| `adonis` | `adonisjs` |
| `ae` | `adobeaftereffects` |
| `aftereffects` | `adobeaftereffects` |
| `ai` | `adobeillustrator` |
| `amber` | `amberlang` |
| `angular` | `angularjs` |
| `antigravity` | `googleantigravity` |
| `arc` | `arcbrowser` |
| `arch` | `archlinux` |
| `asm` | `assembly` |
| `au` | `adobeaudition` |
| `audition` | `adobeaudition` |
| `aws` | `amazonwebservices` |
| `batchfile` | `batch` |
| `batchscript` | `batch` |
| `beam` | `apachebeam` |
| `beef` | `beeflang` |
| `beekeeper` | `beekeeperstudio` |
| `bigquery` | `googlebigquery` |
| `bots` | `discordbots` |
| `budgiedesktop` | `buddiesofbudgie` |
| `c4d` | `cinema4d` |
| `caddy` | `caddyserver` |
| `capacitor` | `capacitorjs` |
| `cf` | `cloudflare` |
| `chrome` | `googlechrome` |
| `clipchamp` | `microsoftclipchamp` |
| `cloudcomposer` | `googlecloudcomposer` |
| `cloudfirestore` | `firebasecloudfirestore` |
| `cloudstorage` | `googlecloudstorage` |
| `computeengine` | `googlecomputeengine` |
| `copilot` | `microsoftcopilot` |
| `csp` | `clipstudiopaint` |
| `cudacpp` | `cudacplusplus` |
| `d` | `dlang` |
| `d3` | `d3js` |
| `dataflow` | `googledataflow` |
| `dataproc` | `googledataproc` |
| `davinci` | `davinciresolve` |
| `docs` | `googledocs` |
| `dreamweaver` | `adobedreamweaver` |
| `drf` | `djangorestframework` |
| `drive` | `googledrive` |
| `dvc` | `dataversioncontrol` |
| `dw` | `adobedreamweaver` |
| `elysia` | `elysiajs` |
| `ember` | `emberjs` |
| `entra` | `microsoftentra` |
| `es` | `elasticsearch` |
| `excel` | `microsoftexcel` |
| `express` | `expressjs` |
| `fabric` | `microsoftfabric` |
| `fasm` | `flatassembler` |
| `fb` | `facebook` |
| `firebaseai` | `firebaseailogic` |
| `firebasecloud` | `firebasecloudfirestore` |
| `foundry` | `microsoftfoundry` |
| `fs` | `fusejs` |
| `fsd` | `featuresliceddesign` |
| `fuse` | `fusejs` |
| `gadsense` | `googleadsense` |
| `gatsbyjs` | `gatsby` |
| `gcloud` | `googlecloud` |
| `gcp` | `googlecloud` |
| `gemini` | `googlegemini` |
| `gh` | `github` |
| `ghactions` | `githubactions` |
| `ghcopilot` | `githubcopilot` |
| `ghpages` | `githubpages` |
| `go` | `golang` |
| `gql` | `graphql` |
| `grunt` | `gruntjs` |
| `hadoop` | `apachehadoop` |
| `hf` | `huggingface` |
| `hive` | `apachehive` |
| `hop` | `apachehop` |
| `htb` | `hackthebox` |
| `id` | `adobeindesign` |
| `idx` | `googleidx` |
| `ig` | `instagram` |
| `illustrator` | `adobeillustrator` |
| `indesign` | `adobeindesign` |
| `inertia` | `inertiajs` |
| `intellij` | `intellijidea` |
| `intune` | `microsoftintune` |
| `jmeter` | `apachejmeter` |
| `js` | `javascript` |
| `jsr` | `javascriptregistry` |
| `k8s` | `kubernetes` |
| `kali` | `kalilinux` |
| `ktorio` | `ktor` |
| `lightroom` | `adobelightroom` |
| `looker` | `lookerstudio` |
| `lottie` | `lottiefiles` |
| `lr` | `adobelightroom` |
| `manifold` | `manifoldjs` |
| `maven` | `apachemaven` |
| `mcp` | `modelcontextprotocol` |
| `md` | `markdown` |
| `mongo` | `mongodb` |
| `mui` | `materialui` |
| `myshell` | `myshellai` |
| `nest` | `nestjs` |
| `net` | `dotnet` |
| `next` | `nextjs` |
| `nextauth` | `authjs` |
| `nix` | `nixos` |
| `node` | `nodejs` |
| `notepad++` | `notepadplusplus` |
| `notepadpp` | `notepadplusplus` |
| `nuxt` | `nuxtjs` |
| `objc` | `objectivec` |
| `oci` | `oraclecloudinfrastructure` |
| `office` | `microsoftoffice` |
| `onedrive` | `microsoftonedrive` |
| `onenote` | `microsoftonenote` |
| `ood` | `openondemand` |
| `otel` | `opentelemetry` |
| `outlook` | `microsoftoutlook` |
| `oxfmt` | `oxc` |
| `oxlint` | `oxc` |
| `pb` | `pocketbase` |
| `photoshop` | `adobephotoshop` |
| `pop` | `popos` |
| `postgres` | `postgresql` |
| `powerautomate` | `microsoftpowerautomate` |
| `powerpoint` | `microsoftpowerpoint` |
| `premierepro` | `adobepremierepro` |
| `project` | `microsoftproject` |
| `ps` | `adobephotoshop` |
| `pwsh` | `powershell` |
| `py` | `python` |
| `pyspark` | `apachespark` |
| `rails` | `rubyonrails` |
| `react` | `reactjs` |
| `regle` | `reglejs` |
| `rollup` | `rollupjs` |
| `ros` | `robotoperatingsystem` |
| `s3` | `amazons3` |
| `sc` | `scala` |
| `sclearn` | `scikitlearn` |
| `scss` | `sass` |
| `sdl` | `simpledirectmedialayer` |
| `sharepoint` | `microsoftsharepoint` |
| `sheets` | `googlesheets` |
| `sklearn` | `scikitlearn` |
| `so` | `stackoverflow` |
| `solid` | `solidjs` |
| `spark` | `apachespark` |
| `sqla` | `sqlalchemy` |
| `stan` | `stanjs` |
| `synapse` | `azuresynapse` |
| `tailwind` | `tailwindcss` |
| `teams` | `microsoftteams` |
| `truenas` | `truenascore` |
| `ts` | `typescript` |
| `tseslint` | `typescripteslint` |
| `unreal` | `unrealengine` |
| `upstage` | `upstageai` |
| `uv` | `astraluv` |
| `visio` | `microsoftvisio` |
| `vscode` | `visualstudiocode` |
| `vscodeinsiders` | `visualstudiocodeinsiders` |
| `vue` | `vuejs` |
| `wasdk` | `windowsappsdk` |
| `wasm` | `webassembly` |
| `windi` | `windicss` |
| `word` | `microsoftword` |
| `workspace` | `googleworkspace` |
| `wp` | `wordpress` |
| `ws` | `websocket` |
| `xd` | `adobexd` |
| `yml` | `yaml` |
| `yt` | `youtube` |

Full icon names also work, e.g. `i=javascript` is the same as `i=js`. Names that changed when icon-marquee switched icon sets (e.g. `react` → `reactjs`, `photoshop` → `adobephotoshop`) are kept as short names, so existing URLs that use them still work.

## Available icons

1041 icons, 767 of them themed.

<details>
<summary>Show all icon names</summary>

`7zip`*, `8th`*, `activitypub`*, `actix`, `adiantiframework`*, `adobe`*, `adobeacrobat`, `adobeaftereffects`, `adobeaudition`, `adobecoldfusion`, `adobedreamweaver`, `adobeexpress`*, `adobeillustrator`, `adobeindesign`, `adobelightroom`, `adobephotoshop`, `adobepremierepro`, `adobexd`, `adonisjs`, `affinity`, `agda`*, `airflow`*, `aiscript`*, `aisdk`, `alacritty`*, `alchemy`, `algolia`, `alibabacloud`, `alpinejs`*, `alpinelinux`*, `amazons3`, `amazonwebservices`*, `amberlang`*, `amplify`, `anaconda`*, `android`*, `androidstudio`*, `angularjs`*, `animejs`*, `ansible`*, `antdesign`*, `anyrun`*, `anyscale`, `anytype`*, `apache`*, `apachebeam`*, `apachehadoop`*, `apachehive`*, `apachehop`, `apachejmeter`*, `apachemaven`*, `apachespark`*, `apachesubversion`*, `apidog`*, `apifox`*, `apipost`, `apktool`*, `apollo`, `appian`, `appium`*, `apple`*, `appwrite`, `arcbrowser`*, `archlinux`, `archunit`*, `arduino`, `argocd`*, `arturo`, `asciidoctordocs`, `aseprite`*, `aspaper`*, `assembly`*, `astraluv`*, `astro`*, `atom`, `auth0`*, `authjs`*, `authy`, `autocad`*, `autodeskfusion`*, `autohotkey`, `avaloniaui`, `axios`, `azul`*, `azure`*, `azuresynapse`*, `babel`*, `babylonjs`*, `backblaze`, `backbonejs`*, `balenaetcher`*, `ballerina`*, `bambustudio`, `baseui`*, `bash`, `batch`*, `bazarr`*, `beagleboard`*, `beeflang`*, `beekeeperstudio`*, `bento`*, `betterauth`, `bevy`, `bing`*, `binijs`*, `biome`*, `bitbucket`*, `blazor`*, `blender`*, `bloc`*, `bluesky`, `bolt`, `bookstack`*, `bootstrap`, `boundary`*, `box2d`*, `brave`*, `browserstack`*, `bruno`*, `buddiesofbudgie`*, `bugsnag`, `builder`*, `bullmq`*, `bulma`*, `bun`*, `bunnynet`*, `burncloud`*, `burpsuite`, `bytedance`*, `c`, `cachyos`*, `caddyserver`*, `cairo`*, `cakebuild`*, `cakephp`*, `camtasia`, `camunda`, `canva`, `capacitorjs`*, `capcut`, `cassandra`*, `catboost`, `catch2`*, `celery`*, `centos`*, `chakraui`*, `chartjs`*, `chatgpt`*, `chocolatey`*, `chroma`*, `chromium`*, `cinema4d`*, `circleci`, `cisco`, `civitai`*, `claudeai`*, `claudecode`*, `clerk`*, `clickhouse`*, `clickup`*, `cline`*, `clion`*, `clipstudiopaint`, `clojure`*, `cloudflare`*, `cloudflareworkers`*, `cloudinary`, `cmake`*, `cmder`*, `codeberg`, `codeblocks`*, `codechef`, `codecov`, `codeforces`*, `codegeex`*, `codeigniter`*, `codepen`*, `codeql`, `coderabbit`, `codewars`*, `codex`*, `coffeescript`*, `cohere`*, `comfyui`*, `commitlint`*, `composehotreload`*, `composemultiplatform`*, `composer`*, `conar`, `confluence`*, `consul`*, `convex`*, `cookiecutter`*, `coolify`*, `coze`*, `cpanel`*, `cpp`, `crewai`*, `crush`*, `crusoe`*, `crystal`, `csharp`, `css`, `css3`, `csv`*, `cucumber`*, `cudacplusplus`*, `curl`, `curseforge`*, `cursor`, `cypress`*, `d3js`*, `dagshub`*, `dailydev`*, `daisyui`*, `dart`*, `databricks`*, `datadog`, `datagrip`*, `datalore`*, `dataversioncontrol`*, `datefns`, `davinciresolve`*, `dbeaver`*, `dbt`*, `debian`, `deepin`*, `deepseek`, `deno`*, `dependabot`*, `designali`*, `devto`, `dhizuku`*, `digitalocean`, `directus`, `discord`, `discordbots`*, `discordjs`*, `disqus`*, `django`, `djangorestframework`*, `dlang`*, `dlthub`*, `dndkit`, `dnspy`*, `docker`, `dockge`*, `docus`*, `docusaurus`*, `dokploy`*, `dotnet`, `drawio`*, `dremio`*, `drizzle`*, `dropbox`, `drupal`, `duckdb`*, `dyad`*, `easybuild`*, `echo`*, `eclipseide`*, `edge`*, `edgeimpulse`*, `effect`*, `ejs`*, `elasticsearch`*, `electron`, `element`, `elementaryos`, `elementor`*, `elementplus`*, `elevenlabs`*, `elixir`*, `elysiajs`*, `emberjs`, `emby`*, `endeavouros`*, `erlang`, `esbuild`*, `eslint`*, `esp32`*, `etcd`*, `eventbridge`, `excalidraw`*, `expo`, `exposed`*, `expressjs`*, `expressvpn`, `fabricjs`*, `fabricmc`*, `facebook`, `fastapi`*, `fastify`*, `fdroid`*, `featuresliceddesign`*, `fedora`*, `fiber`*, `figma`*, `filezilla`, `filmora`, `firebase`*, `firebaseailogic`*, `firebaseauthentication`*, `firebasecloudfirestore`*, `firebasestudio`*, `firefox`*, `fivetran`*, `flameengine`*, `flask`, `flatassembler`*, `fleet`*, `flightcontrol`, `flourish`*, `flowbite`*, `flutter`*, `flutterflow`, `flyio`, `forem`, `forgejo`*, `forgemc`*, `fortran`, `framer`, `freebsd`*, `freecad`*, `freecodecamp`, `freelancer`*, `fresh`*, `fresheditor`*, `fsharp`*, `fusejs`*, `ganache`*, `gatsby`*, `gdevelop`, `geany`*, `geminicli`*, `genkit`*, `gentoo`*, `getx`*, `ghdl`*, `ghidra`, `ghostty`*, `gimp`*, `gin`*, `git`, `gitbash`*, `gitbook`*, `gitea`*, `github`*, `githubactions`*, `githubcopilot`*, `githubpages`*, `gitkraken`, `gitlab`*, `gitlocalize`*, `gitmind`*, `gitpod`*, `gleam`*, `gmail`*, `gnu`, `godot`*, `goland`*, `golang`, `googleadk`*, `googleadsense`*, `googleantigravity`*, `googlebigquery`*, `googlechrome`*, `googlecloud`*, `googlecloudcomposer`*, `googlecloudstorage`*, `googlecolaboratory`*, `googlecomputeengine`*, `googledataflow`*, `googledataproc`*, `googledocs`*, `googledrive`*, `googleforms`*, `googlegemini`*, `googleidx`*, `googlesheets`*, `googleslides`*, `googleworkspace`*, `gorm`*, `gradle`, `grafana`*, `graphite`*, `graphql`, `greeter`*, `gridsome`*, `grok`, `groovy`*, `groq`, `grpc`, `gruntjs`*, `gsap`*, `gtkwave`*, `hackerrank`*, `hackthebox`*, `hacs`, `handycontrols`, `haproxy`*, `hashicorp`*, `hashnode`*, `haskell`*, `haxe`*, `headlessui`*, `helia`*, `helm`, `herdr`, `heroku`, `heroui`*, `hexo`*, `heyapi`*, `hibernate`*, `homeassistant`, `homebrew`*, `hono`*, `hoppscotch`, `hostgator`*, `html`, `htmx`*, `httpie`*, `hub`*, `hubspot`, `huggingface`*, `hugo`*, `hyper`*, `hyprland`*, `i18next`*, `iceberg`*, `ida`, `ifttt`*, `inertiajs`, `influxdb`, `inkscape`*, `insomnia`, `instagram`, `intellijidea`*, `ionic`, `ios`*, `ipados`*, `istio`, `jaeger`*, `jakartaee`, `jamstack`*, `jasmine`*, `jaspr`*, `java`*, `javascript`, `javascriptregistry`*, `jdbc`*, `jekyll`*, `jellyfin`*, `jellyseerr`*, `jenkins`*, `jest`, `jetpack`*, `jetpackcompose`*, `jira`*, `jitsi`*, `joomla`*, `jotai`*, `jquery`, `json`*, `jsonschema`, `jujutsu`, `julia`*, `junit4`*, `junit5`*, `jupyter`*, `jwt`*, `k3s`*, `k6`*, `kafka`, `kaggle`, `kalilinux`*, `katalon`*, `keet`*, `kepware`*, `keras`, `kestra`, `keycloak`*, `kiali`*, `kicad`*, `kiro`, `kitty`*, `kofi`*, `koin`*, `konva`*, `kotlin`*, `kotlinmultiplatform`*, `kotlinnotebook`*, `koyeb`, `krita`*, `ktor`*, `kubernetes`, `kubuntu`*, `lando`*, `langchain`, `laravel`, `latex`, `launchdarkly`*, `lavalink`, `leaflet`*, `leetcode`*, `lemonsqueezy`, `lenis`, `less`*, `letterboxd`*, `librepcb`*, `lidarr`*, `linkedin`, `linux`*, `linuxmint`, `liquidsoap`*, `litert`*, `litestar`*, `litmus`, `livewire`*, `llamaindex`*, `llmrouter`*, `llvm`*, `lmstudio`, `logto`*, `lokalise`, `loki`*, `lookerstudio`*, `lottiefiles`, `lovable`*, `lua`*, `lubuntu`*, `lucia`, `lucide`*, `lumo`*, `lynxjs`*, `macos`*, `magicui`*, `magisk`*, `makecode`, `mambaui`, `manifoldjs`*, `manim`*, `manjaro`, `mapbox`, `mariadb`, `markdown`*, `mastodon`*, `materialdesign`*, `materialformkdocs`*, `materialui`, `matlab`*, `matplotlib`*, `matrix`, `medium`, `medusa`*, `mermaid`, `meta`*, `metabase`*, `metasploit`*, `mgx`*, `micropython`*, `microsoft365copilot`*, `microsoftaccess`*, `microsoftclipchamp`*, `microsoftcopilot`*, `microsoftentra`*, `microsoftexcel`*, `microsoftfabric`*, `microsoftforms`*, `microsoftfoundry`*, `microsoftintune`*, `microsoftoffice`*, `microsoftonedrive`*, `microsoftonenote`*, `microsoftoutlook`*, `microsoftpowerautomate`*, `microsoftpowerpoint`*, `microsoftproject`*, `microsoftsharepoint`*, `microsoftteams`*, `microsoftvisio`*, `microsoftword`*, `mikroc`, `milligram`*, `mimir`*, `minimax`, `minio`*, `mkdocs`*, `mlflow`*, `modelcontextprotocol`*, `mohistmc`*, `mongodb`, `motherduck`*, `motion`, `mqtt`, `msdos`*, `msys2`, `myshellai`*, `mysql`*, `n8n`, `navicat`*, `neo4j`*, `neocities`*, `neoforge`*, `neon`*, `neovim`*, `nestjs`, `netbeans`*, `netbird`*, `netflixdgs`*, `netlify`*, `newrelic`*, `nextdns`*, `nextjs`*, `nginx`, `ngrok`, `ngrx`*, `nim`*, `niri`*, `nitro`*, `nixos`*, `nmap`*, `noctalia`*, `nodejs`*, `nodemon`, `nodered`, `nomad`*, `notepadplusplus`*, `notion`*, `npm`, `nuget`, `numpy`*, `nunjucks`, `nuxthub`*, `nuxtjs`*, `oauth`*, `objectivec`, `obs`*, `obsidian`*, `obtainium`*, `ocaml`, `ollama`*, `omarchy`*, `ombi`*, `onyx`*, `openapi`*, `openclaw`*, `opencode`*, `opencv`*, `opengl`*, `openlayers`*, `openondemand`*, `openscad`*, `opensergo`, `openstreetmap`*, `opensuse`*, `opentelemetry`*, `openvpn`*, `openweather`*, `openwebui`, `opera`*, `oracle`*, `oraclecloudinfrastructure`*, `orcaslicer`, `orpc`*, `oumi`*, `overleaf`*, `overpassapi`, `overseerr`*, `oxc`*, `p4`*, `packer`*, `pandacss`, `pandas`*, `papermc`*, `parcel`*, `parrotos`*, `passportjs`*, `patreon`*, `payload`*, `peazip`*, `peerlist`*, `pennylane`*, `penpot`*, `pentahopdi`, `perplexity`, `phoenix`, `php`, `phpstorm`*, `pinia`*, `pinterest`, `pkgroll`*, `platformio`*, `plausible`, `playwright`*, `plex`*, `plotly`*, `pnpm`*, `pocketbase`*, `podman`*, `polars`*, `popos`*, `portugolstudio`*, `postcss`*, `postgresql`*, `posthog`*, `postman`, `powerbi`*, `powershell`*, `preact`*, `prettier`*, `primevue`*, `prisma`, `prismic`*, `procure`*, `prolog`*, `prometheus`, `protoncalendar`*, `protondrive`*, `protonmail`*, `protonpass`*, `protonvpn`*, `protonwallet`*, `prowlarr`*, `proxmox`*, `psycopg`*, `pug`*, `pull`*, `pulumi`*, `puppeteer`*, `puppylinux`*, `purpur`*, `putty`*, `pwa`*, `pycharm`*, `pydantic`, `pygame`*, `pymc`*, `pypi`*, `pyramid`*, `pytest`*, `python`*, `pytorch`*, `pytorch3d`*, `pywebview`*, `qdrant`*, `qoder`*, `qtwidgets`*, `quarkus`*, `quasar`*, `qubesos`*, `quiltmc`*, `qwik`*, `qwiklabs`, `r`*, `rabbitmq`*, `radarr`*, `radixui`*, `railway`*, `raspberrypi`*, `raygui`, `raylib`, `reactdatepicker`, `reacthookform`, `reactjs`*, `reactlynx`*, `reactnative`*, `reactquery`*, `reactrouter`*, `readarr`*, `readthedocs`*, `reddit`*, `redhat`*, `redis`*, `redoc`, `redux`, `refine`*, `regex`*, `reglejs`*, `rekaui`*, `render`*, `renovate`, `replit`, `resend`*, `rest`, `revolt`*, `rider`*, `riverpod`*, `robotoperatingsystem`*, `rocketmq`*, `rocksdb`*, `rolldown`, `rollupjs`*, `roocode`*, `ruby`*, `rubymine`*, `rubyonrails`, `rust`*, `rxjs`*, `sanity`, `sap`, `sass`, `scala`, `scikitlearn`*, `scipy`*, `scratch`*, `seaborn`*, `semanticui`, `sentry`, `sequelize`*, `serverless`*, `servicenow`*, `session`*, `setapp`, `seyfert`*, `shadcnui`*, `shiki`*, `shizuku`*, `shopify`*, `signal`, `signoz`, `simpledirectmedialayer`, `singlespa`*, `singularity`, `skeletonui`*, `sketch`*, `slack`*, `slackwarelinux`*, `slidev`*, `slint`*, `slurm`*, `snipcart`*, `snowflake`, `snyk`*, `soap`, `socketio`*, `solidity`, `solidjs`*, `solidstart`*, `solr`*, `solus`*, `sonarqube`, `sonarr`*, `soundbridge`*, `sphinx`, `splunk`, `spring`*, `springai`*, `springbatch`*, `springboot`*, `springcloud`*, `springgraphql`*, `springsecurity`*, `springshell`*, `spss`, `spyder`*, `sql`*, `sqlalchemy`*, `sqlite`*, `sqlserver`*, `sst`*, `stackblitz`, `stackoverflow`, `stanjs`*, `starlight`*, `stata`, `steam`, `stimulus`*, `storyblok`, `storybook`, `strapi`, `streamlit`*, `stride`*, `stripe`, `styledcomponents`, `sublime`*, `suitecrm`*, `supabase`*, `surrealdb`*, `svelte`, `svg`*, `swagger`, `swc`*, `swift`, `swiftui`, `swiper`*, `swr`*, `symfony`*, `systemd`*, `t0ggles`*, `tabby`*, `tableau`*, `taiga`*, `tailscale`, `tailwindcss`*, `tailwindmerge`*, `tanstack`*, `targon`, `tauri`*, `telegram`, `tempo`*, `tensorflow`*, `termux`, `terraform`*, `testcontainers`*, `thesvg`*, `threads`, `threejs`*, `thunderbird`*, `thunderclient`*, `tidb`*, `tiktok`, `tinacms`*, `tinkercad`*, `tinyhttp`*, `tmux`*, `toml`*, `trae`*, `traefik`*, `treesitter`*, `trello`, `triage`*, `trivy`*, `trpc`, `truenascore`*, `truenasenterprise`*, `truenasscale`*, `tsdown`*, `turborepo`*, `turso`, `twilio`, `twine`*, `twitter`, `typeorm`*, `typescript`, `typescripteslint`*, `typst`*, `ubuntu`, `udemy`*, `umami`*, `umbraco`*, `umbriel`*, `uml`*, `unity`, `unocss`*, `unrealengine`*, `upstageai`*, `upstash`*, `uvicorn`*, `v0`, `vagrant`*, `vala`, `valibot`*, `valkey`*, `vanillaos`*, `vapor`*, `vault`*, `vaxee`*, `vegaspro`, `velocity`, `veracrypt`*, `vercel`*, `vhdl`, `videojs`*, `vike`*, `vim`*, `virtualbox`*, `virustotal`, `visualstudio`*, `visualstudiocode`*, `visualstudiocodeinsiders`*, `vite`*, `vitepress`*, `vitepwa`*, `vitest`*, `vivaldi`, `vk`, `vlc`, `vlitejs`*, `vmix`*, `vmware`*, `voidlinux`*, `vscodium`*, `vuefire`*, `vueform`*, `vuejs`*, `vuepress`*, `vuetify`*, `vueuse`*, `vulkan`*, `wakatime`*, `wampserver`*, `warp`*, `waypoint`*, `weaviate`*, `webassembly`, `weblate`*, `websocket`*, `webstorm`*, `webstudio`*, `whatsapp`, `whisparr`*, `windicss`*, `windows`, `windowsappsdk`*, `windsurf`*, `winui`*, `wireshark`*, `wolframmathematica`*, `woocommerce`, `wordpress`, `wxt`*, `x`, `xamarin`*, `xaml`*, `xampp`, `xcode`*, `xftp`*, `xml`*, `xposed`*, `xshell`*, `xubuntu`*, `yaak`, `yaml`*, `yandexen`, `yandexru`, `yarn`*, `yii`*, `yolo`*, `youtube`*, `zabbix`, `zeabur`*, `zed`, `zen`*, `zensical`*, `zerops`*, `zig`*, `zod`*, `zorinos`, `zshell`*, `zustand`*

\* follows the viewer's light/dark setting.

</details>

## Self-hosting

Requires [Bun](https://bun.sh).

```sh
bun install
cp .env.example .env   # then set APP_NAME
bun dev                # http://localhost:3000/v1/marquee?i=js,ts
```

### Environment

| Variable | Required | Description |
| --- | --- | --- |
| `APP_NAME` | yes | App name. The server refuses to start without it. |

### Scripts

| Script | Does |
| --- | --- |
| `bun dev` | Run with hot reload |
| `bun start` | Run |
| `bun test` | Run tests |
| `bun run typecheck` | Type-check with `tsc` |
| `bun run check` | Lint, format and sort imports with Biome |

## Credits

Icons are from [skills-icons](https://github.com/syvixor/skills-icons) by Syvixor, MIT licensed. See [ATTRIBUTION.md](ATTRIBUTION.md).

## License

[MIT](LICENSE)
