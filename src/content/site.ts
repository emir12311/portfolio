export type SectionId = 'projects' | 'about' | 'skills' | 'contact';
export type ProjectTone = 'gold' | 'violet' | 'green';
export type ContactKind = 'github' | 'email' | 'discord';
export type ProjectLinkKind = 'source' | 'release';

export interface ProjectLink {
  kind: ProjectLinkKind;
  href: string;
}

export interface ProjectFact {
  label: string;
  value: string;
}

export interface ProjectDetail {
  tagline: string;
  what: string;
  highlights: string[];
  how: string[];
  limits: string[];
  facts: ProjectFact[];
}

export interface Project {
  id: string;
  name: string;
  summary: string;
  why: string;
  tech: string[];
  aiDirected?: boolean;
  detail: ProjectDetail;
  media: {
    src: string;
    alt: string;
    width: number;
    height: number;
    tone: ProjectTone;
  };
  links: ProjectLink[];
}

export interface SkillGroup {
  id: string;
  label: string;
  items: string[];
}

export interface ContactLink {
  kind: ContactKind;
  label: string;
  value: string;
  href: string;
}

export interface Section {
  id: SectionId;
  label: string;
  navLabel: string;
  path: string;
  visible: boolean;
}

export interface SiteContent {
  name: string;
  handle: string;
  tagline: string;
  bio: string;
  meta: {
    title: string;
    description: string;
  };
  sections: Section[];
  projects: Project[];
  skills: SkillGroup[];
  contact: ContactLink[];
  ui: {
    skipLink: string;
    navLabel: string;
    menu: string;
    links: {
      source: string;
      release: string;
    };
    projectWhy: string;
    projectTech: string;
    projectDoes: string;
    projectHow: string;
    projectLimits: string;
    projectFacts: string;
    toolsUsedIn: string;
    toolsProjects: string;
    aiBadge: string;
    backToTop: string;
    copyright: string;
  };
}

export const site: SiteContent = {
  name: 'Mehmet Emir Gündağ',
  handle: 'emir12311',
  tagline: 'Building software, learning C, and directing AI.',
  bio: "I'm a 10th-grade IT student who's been interested in technical things like software development since I was 10. I started actually making software around the start of 9th grade, beginning with Python. Right now I'm working on getting better at C and at directing AI so I can build better software, faster.",
  meta: {
    title: 'Mehmet Emir Gündağ — Building software, learning C, and directing AI',
    description:
      'Building software, learning C, and directing AI. Projects by Mehmet Emir Gündağ: Croquis, lnetx, and webp-purger.',
  },
  sections: [
    {
      id: 'projects',
      label: "Things I've built",
      navLabel: 'Built',
      path: '/projects',
      visible: true,
    },
    {
      id: 'about',
      label: 'About',
      navLabel: 'About',
      path: '/about',
      visible: true,
    },
    {
      id: 'skills',
      label: 'Tools I use',
      navLabel: 'Tools',
      path: '/tools',
      visible: true,
    },
    {
      id: 'contact',
      label: 'Say hi',
      navLabel: 'Say hi',
      path: '/contact',
      visible: true,
    },
  ],
  projects: [
    {
      id: 'croquis',
      name: 'croquis',
      summary:
        'A local, offline Arduino circuit simulator. Drag components onto a canvas, wire them up, write a sketch, and run it on a simulated AVR chip.',
      why: "I wanted a circuit simulator that was local, offline, free, and polished. That gap didn't exist, so I built one.",
      tech: ['Tauri', 'Svelte 5', 'TypeScript', 'Rust', 'simavr / avr-gcc'],
      aiDirected: true,
      detail: {
        tagline: 'A circuit simulator, running entirely on your own machine.',
        what: 'A desktop app for building and running Arduino circuits without an Arduino. You drag components onto a canvas, wire them up, write a sketch and press Run. The sketch is compiled locally with avr-gcc and executed on a simulated AVR chip.',
        highlights: [
          '15 preset circuits to start from — Blink, Button, Potentiometer, Photoresistor, Thermometer, Slide potentiometer, RGB LED, Joystick, Digital sensors, Seven segment, Four digit, LED bar, Buzzer & relay, Button + serial and Fade.',
          'Parts include the Uno, LEDs including RGB, resistors, pushbuttons, rotary and slide potentiometers, photoresistor, NTC temperature sensor, analog joystick, tilt switch, PIR, flame and sound sensors, a buzzer, relay, 7-segment and 4-digit displays, an LED bar, and half or full breadboards.',
          'The canvas does drag, rotate and snap, orthogonal wiring, multi-select, undo/redo and copy/paste. Wokwi diagrams.json imports and exports, sketch included.',
          'The editor is CodeMirror with Arduino API completions, and the serial monitor docks beside the circuit.',
          'No server, no account, no telemetry, no network calls.',
        ],
        how: [
          'Your sketch is compiled by avr-gcc into a real AVR program — it is not interpreted.',
          'simavr runs that program instruction by instruction, paced to real time.',
          'When a pin goes high, the netlist works out what is wired to it and how much current will actually flow, so the canvas draws the LED lit — or burnt, if you left the resistor out.',
          'Input travels the other way: holding a button or turning a knob feeds set_input and set_analog back into simavr, with analogue values held as a voltage so analogRead re-reads them every loop.',
        ],
        limits: [
          'No servo or LCD yet.',
          'A second Uno gets its own circuit but shares the single sketch.',
          'The electrical model is deliberately small, not a circuit solver: a resistor does something real and a missing one is reported, but there are no arbitrary parallel networks.',
          "Wokwi files open with one caveat — a wire using Wokwi's `*` route separator draws a different path here, though to the same pins.",
        ],
        facts: [
          { label: 'Written in', value: 'Tauri, Svelte 5, TypeScript and Rust' },
          { label: 'Released', value: 'v0.1 took about 3 days' },
          { label: 'License', value: 'AGPL v3.0' },
          { label: 'Install', value: 'AppImage, .deb, .rpm, or build from source' },
        ],
      },
      media: {
        src: '/media/projects/croquis-logo.webp',
        alt: 'Croquis logo',
        width: 512,
        height: 512,
        tone: 'gold',
      },
      links: [
        {
          kind: 'source',
          href: 'https://github.com/emir12311/croquis',
        },
        {
          kind: 'release',
          href: 'https://github.com/emir12311/croquis/releases/latest',
        },
      ],
    },
    {
      id: 'lnetx',
      name: 'lnetx',
      summary:
        'A LAN file-transfer CLI. The receiver shows the file name, size, and BLAKE3 hash, then waits for confirmation before writing anything.',
      why: 'I used LocalSend for a while, but its UI and discovery were finicky. I wanted something minimal that did the same job.',
      tech: ['C', 'TCP sockets', 'BLAKE3'],
      detail: {
        tagline: 'A CLI for all your file transfer troubles.',
        what: 'Sends a file from one machine to another on the same network. The receiving side shows the file name, size and hash, and waits for your y before anything gets written.',
        highlights: [
          'The receiver confirms before anything is written: you see the name, size and BLAKE3 hash first, and n stops the transfer before a single byte lands.',
          'Integrity is checked end to end — the received file is hashed and compared against the sender\'s before it is renamed into ~/Downloads.',
          'Transfers run in 64 KiB chunks written as <name>.part, so a half-finished file never looks like a finished one.',
          'Aliases save a name for an IP, so you stop typing addresses.',
          'Plain TCP sockets in C — the receiver listens on port 56389.',
        ],
        how: [
          'The sender hashes the file and sends its name, size and BLAKE3 hash.',
          'The receiver answers N to decline or G to go; on N the sender stops without sending the file.',
          'On G the file arrives in 64 KiB chunks, written as <name>.part.',
          'The received file is hashed: on a match, and with no name clash, it is renamed into ~/Downloads and the receiver replies K — the sender only reports success once it sees that K.',
        ],
        limits: [
          'Same network only — there is no relay or remote-host path.',
          'A name clash at the destination is treated as a failed transfer rather than overwriting.',
        ],
        facts: [
          { label: 'Written in', value: 'C, on plain TCP sockets with BLAKE3' },
          { label: 'Released', value: 'About 2 weeks' },
          { label: 'License', value: 'GPL v3.0' },
          { label: 'Install', value: 'Build with make (Clang, Git, Make) or take the binary from releases' },
        ],
      },
      media: {
        src: '/media/projects/lnetx-logo.webp',
        alt: 'lnetx logo',
        width: 900,
        height: 900,
        tone: 'violet',
      },
      links: [
        {
          kind: 'source',
          href: 'https://github.com/emir12311/lnetx',
        },
        {
          kind: 'release',
          href: 'https://github.com/emir12311/lnetx/releases/latest',
        },
      ],
    },
    {
      id: 'webp-purger',
      name: 'webp-purger',
      summary:
        'A recursive WebP-to-PNG converter. Give it a directory, and it converts every valid .webp file it finds, moving originals to ~/.webptrashed.',
      why: 'Downloading WebP files for slide shows was a recurring pain, so I built a small CLI to batch-convert them.',
      tech: ['C', 'libwebp', 'libpng'],
      detail: {
        tagline: 'A CLI to deal with all your WebP troubles.',
        what: 'Walks through a path you give it and converts every valid .webp file it finds.',
        highlights: [
          'Recursive by design: give it a directory and it walks into every subdirectory looking for WebP files.',
          'Nothing is destroyed — converted originals are moved to ~/.webptrashed rather than deleted.',
          'Flags for real batches: --force skips the prompt on failed files, --include-hidden reaches dotfiles and dot-directories, and --verbose prints the full error behind a failure.',
          'Built in C against libwebp and libpng.',
        ],
        how: [
          'The directory you pass is opened and its entries are looped through.',
          'Any entry that is another directory sends walk() back around.',
          'A file entry is checked to see whether it is really a WebP image.',
          'If it is, it is converted to PNG, and on success the original is moved to .webptrashed in your home directory.',
        ],
        limits: [
          'One file at a time, in place — there is no dry-run mode or conversion log.',
          'Failed conversions need --force to skip unattended.',
        ],
        facts: [
          { label: 'Written in', value: 'C, against libwebp and libpng' },
          { label: 'Released', value: 'About 5 days' },
          { label: 'License', value: 'GPL v3.0' },
          { label: 'Install', value: 'Build with make (Clang, Git, Make, libwebp, libpng) or take the binary from releases' },
        ],
      },
      media: {
        src: '/media/projects/webp-purger-logo.webp',
        alt: 'webp-purger logo',
        width: 900,
        height: 900,
        tone: 'green',
      },
      links: [
        {
          kind: 'source',
          href: 'https://github.com/emir12311/webp-purger',
        },
        {
          kind: 'release',
          href: 'https://github.com/emir12311/webp-purger/releases/latest',
        },
      ],
    },
  ],
  skills: [
    {
      id: 'comfortable',
      label: 'Comfortable',
      items: ['Python', 'Linux', 'Git', 'PyQt'],
    },
    {
      id: 'learning',
      label: 'Learning',
      items: ['C', 'Clang', 'Make', 'AI directing'],
    },
    {
      id: 'exploring',
      label: 'Exploring',
      items: ['Godot', 'Networking / TCP', 'Rust'],
    },
  ],
  contact: [
    {
      kind: 'github',
      label: 'GitHub',
      value: '@emir12311',
      href: 'https://github.com/emir12311',
    },
    {
      kind: 'email',
      label: 'Email',
      value: 'emir12311.dev@gmail.com',
      href: 'mailto:emir12311.dev@gmail.com',
    },
    {
      kind: 'discord',
      label: 'Discord',
      value: 'emir12311',
      href: 'https://discord.com/users/734725759427412038',
    },
  ],
  ui: {
    skipLink: 'Skip to content',
    navLabel: 'Primary',
    menu: 'Menu',
    links: {
      source: 'Repository',
      release: 'Latest release',
    },
    projectWhy: 'Why I built it',
    projectTech: 'Built with',
    projectDoes: 'What it does',
    projectHow: 'How it works',
    projectLimits: "What it doesn't do yet",
    projectFacts: 'At a glance',
    toolsUsedIn: 'Used in',
    toolsProjects: 'Across the projects',
    aiBadge: 'AI-directed',
    backToTop: 'Back to top',
    copyright: '© 2026 Mehmet Emir Gündağ',
  },
};
