module.exports = [
  {
    name: "clutch",
    description: "Ce clutch sera t-il inattendue ?"
  },
  {
    name: "play",
    description: "Joue une musique !",
    options: [
      {
        name: "musique",
        description:
          "Le titre de la musique que tu veux écouter (lien youtube).",
        type: 3,
        required: true
      }
    ]
  },
  {
    name: "nowplaying",
    description: "Affiche ce qui est entrain d'être joué."
  },
  {
    name: "skip",
    description: "Saute la musique qui est entrain d'être joué."
  },
  {
    name: "clearqueue",
    description: "Clear la file d'attente."
  },
  {
    name: "pause",
    description: "Met en pause la musique en cours de lecture."
  },
  {
    name: "resume",
    description: "Reprends la musique qui a été mise en pause."
  },
  {
    name: "shuffle",
    description: "Joue la queue en random."
  },
  {
    name: "queue",
    description: "Affiche la file d'attente"
  }
];
