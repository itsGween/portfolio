export interface Post {
  id: string
  cat: { fr: string; en: string }
  date: { fr: string; en: string }
  read: { fr: string; en: string }
  title: { fr: string; en: string }
  excerpt: { fr: string; en: string }
  content: { fr: string[]; en: string[] }
  tags: string[]
  gradFrom: string
  gradTo: string
}

export const POSTS: Post[] = [
  {
    id: 'speech-api',
    cat: { fr: 'Frontend', en: 'Frontend' },
    date: { fr: 'Mars 2026', en: 'Mar 2026' },
    read: { fr: '6 min de lecture', en: '6 min read' },
    title: {
      fr: 'Intégrer la Web Speech API dans React : leçons de GENIXI',
      en: 'Integrating the Web Speech API in React: lessons from GENIXI',
    },
    excerpt: {
      fr: "Rendre une interface pilotable à la voix en TypeScript strict, avec gestion des erreurs et support multiplateforme — ce n'est pas aussi simple qu'il y paraît.",
      en: "Making an interface voice-controllable in strict TypeScript, with error handling and cross-platform support — it's not as simple as it looks.",
    },
    content: {
      fr: [
        "Dans GENIXI, notre objectif était clair : permettre à des utilisateurs de naviguer sur une carte interactive sans toucher l'écran. Le cas d'usage semblait simple — l'utilisateur dit une ville, la carte zoome dessus — mais la réalité technique s'est révélée bien plus complexe dès les premières itérations.",
        "L'API Web Speech est native au navigateur, mais entre les différences d'implémentation entre Chrome et Safari, la gestion des états (écoute, traitement, erreur, timeout), et le typage strict en TypeScript, il a fallu bâtir une couche d'abstraction solide. J'ai créé une interface SpeechProvider avec des méthodes start(), stop() et des callbacks onResult/onError standardisés, ce qui permet de swapper l'implémentation backend sans toucher au reste de l'app. Le typage des SpeechRecognitionEvent en TypeScript strict a aussi nécessité des déclarations de type personnalisées, car l'API n'est pas complètement couverte par @types/web.",
        "J'ai découvert que les délais de silence par défaut varient énormément selon les navigateurs — certains coupent l'écoute après 400ms, d'autres après 2000ms. J'ai implémenté ma propre logique de timeout avec un timer JavaScript pour garantir une UX cohérente. Le résultat final : une interface qui répond en moins de 500ms sur desktop, qui gère gracieusement les cas d'erreur (micro non autorisé, réseau instable, navigateur non supporté), et qui montre un indicateur visuel de l'état d'écoute pour que l'utilisateur sache toujours où il en est.",
      ],
      en: [
        "In GENIXI, our goal was clear: let users navigate an interactive map without touching the screen. The use case seemed simple — the user says a city name, the map zooms in — but the technical reality proved far more complex from the very first iterations.",
        "The Web Speech API is native to the browser, but between implementation differences across Chrome and Safari, state management (listening, processing, error, timeout), and strict TypeScript typing, we had to build a solid abstraction layer. I created a SpeechProvider interface with standardized start(), stop() methods and onResult/onError callbacks, which allows swapping the backend implementation without touching the rest of the app. Strictly typing the SpeechRecognitionEvent in TypeScript also required custom type declarations, as the API isn't fully covered by @types/web.",
        "I discovered that default silence timeouts vary wildly across browsers — some cut listening after 400ms, others after 2000ms. I implemented my own timeout logic with a JavaScript timer to guarantee consistent UX. The final result: an interface that responds in under 500ms on desktop, gracefully handles error cases (microphone denied, unstable network, unsupported browser), and shows a visual listening-state indicator so the user always knows what's happening.",
      ],
    },
    tags: ['React', 'TypeScript', 'Web Speech API', 'GENIXI'],
    gradFrom: '#ff7d1c',
    gradTo: '#c2410c',
  },
  {
    id: 'websocket',
    cat: { fr: 'Backend', en: 'Backend' },
    date: { fr: 'Févr. 2026', en: 'Feb 2026' },
    read: { fr: '8 min de lecture', en: '8 min read' },
    title: {
      fr: 'WebSocket temps réel avec NestJS : les vraies difficultés de SmartCart',
      en: 'Real-time WebSocket with NestJS: the real challenges of SmartCart',
    },
    excerpt: {
      fr: "Synchroniser un panier Android et un backend NestJS sans latence perceptible, c'est un exercice d'architecture autant que de code.",
      en: 'Syncing an Android cart and a NestJS backend with imperceptible latency is as much an architecture exercise as a coding one.',
    },
    content: {
      fr: [
        "SmartCart devait synchroniser l'état du panier entre une app Android (Kotlin) et un backend NestJS en moins de 100ms. Dès les premières réunions d'architecture, nous avons écarté le polling HTTP classique : trop de requêtes inutiles, trop de latence variable. Le choix s'est porté sur WebSocket, mais l'implémentation réelle a soulevé des questions auxquelles la documentation ne répond pas.",
        "Le vrai défi n'était pas le protocole lui-même, mais la gestion des conflits : que se passe-t-il si deux utilisateurs ajoutent le même article simultanément depuis deux appareils différents ? J'ai implémenté un système d'événements typés côté serveur (NestJS Gateway) avec un identifiant de séquence sur chaque événement. Le client Android stocke localement l'état optimiste, puis reconcilie avec la réponse serveur. En cas de désaccord, l'état serveur est autoritaire.",
        "Après trois semaines de tests intensifs — y compris des simulations de perte de connexion, de reconnexion et de charge simultanée — le résultat est sans désynchronisation observée. La latence moyenne mesurée est de 47ms, bien en dessous de notre cible de 100ms. La leçon principale : dans un système temps réel, la stratégie de reconciliation est plus importante que le choix du protocole.",
      ],
      en: [
        "SmartCart needed to sync cart state between an Android app (Kotlin) and a NestJS backend in under 100ms. From the very first architecture meetings, we ruled out classic HTTP polling: too many unnecessary requests, too much variable latency. We chose WebSocket, but the actual implementation raised questions that the documentation doesn't answer.",
        "The real challenge wasn't the protocol itself, but conflict management: what happens when two users add the same item simultaneously from two different devices? I implemented a typed event system server-side (NestJS Gateway) with a sequence identifier on each event. The Android client stores the optimistic state locally, then reconciles with the server response. In case of disagreement, the server state is authoritative.",
        "After three weeks of intensive testing — including simulated connection loss, reconnection, and concurrent load — the result is zero desync observed. The average measured latency is 47ms, well below our 100ms target. The main lesson: in a real-time system, the reconciliation strategy matters more than the protocol choice.",
      ],
    },
    tags: ['NestJS', 'WebSocket', 'Kotlin', 'Android'],
    gradFrom: '#c2410c',
    gradTo: '#5a1e02',
  },
  {
    id: 'azure-cli',
    cat: { fr: 'Cloud', en: 'Cloud' },
    date: { fr: 'Janv. 2026', en: 'Jan 2026' },
    read: { fr: '5 min de lecture', en: '5 min read' },
    title: {
      fr: "Infrastructures Azure en PowerShell : ce que j'ai appris en déployant depuis zéro",
      en: 'Azure infrastructure with PowerShell: what I learned deploying from scratch',
    },
    excerpt: {
      fr: "Créer des VNets, VMs, un Key Vault et du VNet Peering depuis un terminal — sans interface graphique — force une compréhension profonde de l'infrastructure cloud.",
      en: 'Creating VNets, VMs, Key Vault, and VNet Peering from a terminal — no GUI — forces a deep understanding of cloud infrastructure.',
    },
    content: {
      fr: [
        "Ce projet académique avait une contrainte inhabituelle : tout devait être fait en ligne de commande PowerShell, sans interface graphique Azure. L'objectif était de déployer une infrastructure complète — groupes de ressources, réseaux virtuels, machines virtuelles Windows et Linux, Key Vault, et VNet Peering entre deux environnements distincts.",
        "L'absence de GUI s'est révélée un avantage inattendu : chaque erreur de configuration apparaît immédiatement dans les logs, sans ambiguïté. J'ai appris à lire les messages d'erreur Azure CLI en détail, à comprendre les dépendances entre ressources (un VNet doit exister avant les sous-réseaux, un Key Vault avant les secrets), et à structurer mes scripts pour les rendre idempotents — c'est-à-dire qu'ils puissent être relancés sans créer de doublons.",
        "Résultat inattendu mais précieux : je comprends maintenant beaucoup mieux ce que des outils comme Terraform ou Bicep font sous le capot — parce que j'ai fait à la main ce qu'ils automatisent. Quand je lis un fichier Bicep aujourd'hui, je visualise exactement les appels CLI qu'il génère. C'est le genre de compréhension qu'on n'acquiert pas en cliquant dans un portail web.",
      ],
      en: [
        "This academic project had an unusual constraint: everything had to be done from the PowerShell command line, with no Azure GUI. The goal was to deploy a complete infrastructure — resource groups, virtual networks, Windows and Linux VMs, Key Vault, and VNet Peering between two distinct environments.",
        "The absence of a GUI turned out to be an unexpected advantage: every configuration error shows up immediately in the logs, without ambiguity. I learned to read Azure CLI error messages in detail, understand the dependencies between resources (a VNet must exist before subnets, a Key Vault before secrets), and structure my scripts to be idempotent — meaning they can be rerun without creating duplicates.",
        "An unexpected but valuable outcome: I now understand much better what tools like Terraform or Bicep do under the hood — because I did by hand what they automate. When I read a Bicep file today, I can visualize exactly the CLI calls it generates. That's the kind of understanding you don't get by clicking around a web portal.",
      ],
    },
    tags: ['Azure', 'PowerShell', 'CLI', 'Key Vault', 'DevOps'],
    gradFrom: '#ff9d3d',
    gradTo: '#ff7d1c',
  },
]
