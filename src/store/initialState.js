export default {
  commands: [
    {
      id: 12346,
      name: 'Line',
      type: 'LINE',
      points: [
        32, 48, 96, 48, 32, 96
      ],
      colors: [8,0],
      pattern: []
    },
    {
      id: 12345,
      name: 'Poly',
      type: 'POLYGON',
      points: [
        64, 32, 96, 96, 32, 96
      ],
      colors: [1,0],
      pattern: []
    }
  ],
  activeCommand: null,
  drawingMode: 'DRAW'
}